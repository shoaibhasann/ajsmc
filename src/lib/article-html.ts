import fs from "node:fs";
import path from "node:path";

/**
 * Reads a published article's HTML and prepares it for rendering.
 *
 * The articles live as HTML fragments under `content/articles/` rather than as JSX. They
 * were written as prose with a lot of comparison tables — one of them has ninety table
 * rows — and hand-converting that to JSX would be thousands of lines of markup with
 * nothing gained. The trade is that this runs at build time only: every article is a
 * static page, so no HTML is parsed in a browser and none of this reaches the client.
 *
 * The file on disk stays clean. Heading ids are injected here rather than written into the
 * source, so an editor never has to keep an id in sync with the words above it.
 */
export type TocEntry = { id: string; text: string };

/** A question heading and the answer under it, for FAQPage structured data. */
export type ArticleFaq = { q: string; a: string };

/**
 * Stable, readable ids: the heading's own words, so a shared link says what it points at.
 *
 * Capped in length, but cut back to the last whole word rather than mid-syllable — these
 * end up in the address bar when someone shares a section, and "...screening-camp" reads
 * like a link where "...screening-cam" reads like a bug.
 */
function slugify(text: string): string {
  const full = text
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  if (full.length <= 60) return full;
  const cut = full.slice(0, 60);
  const lastWord = cut.lastIndexOf("-");
  return lastWord > 24 ? cut.slice(0, lastWord) : cut;
}

/**
 * Most of these articles open with a byline paragraph — "By Dr. So-and-so, Consultant,
 * TNMC 12345." — written when they were review drafts and the reviewer card did not exist.
 * That card now sits directly above the prose and says the same thing with more of it: the
 * name, the role, the degree and the registration number, next to their photograph. Left in,
 * the reader meets the same name twice within a hundred pixels.
 *
 * Only the very first paragraph, and only when it is unmistakably a byline. Nothing is lost
 * — the attribution moved up the page rather than away from it.
 */
const BYLINE = /^\s*<p>\s*(?:<strong>)?\s*(?:By|Written by|Reviewed by|Written and clinically reviewed by)\b[\s\S]*?<\/p>\s*/i;

/**
 * Every H2 in these articles is a question a patient actually types, and the paragraphs
 * under it are the answer. That is exactly the shape of FAQPage, so it is emitted rather
 * than left on the floor: it is what puts a page in People Also Ask, and it is the form an
 * answer engine can lift a question and its answer from as one unit.
 *
 * Prose only. The tables under some headings carry the detail, but flattened into a schema
 * string they become an unreadable run of cells, and a malformed answer is worse than a
 * missing one. Two paragraphs is enough to answer without turning the head of the page into
 * a copy of the body.
 */
function extractFaqs(raw: string): ArticleFaq[] {
  const strip = (h: string) =>
    h
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&(?:l|r)dquo;/g, '"')
      .replace(/&(?:l|r)squo;/g, "'")
      .replace(/\s+/g, " ")
      .trim();

  const faqs: ArticleFaq[] = [];
  const sections = raw.split(/<h2>/).slice(1);

  for (const section of sections) {
    const end = section.indexOf("</h2>");
    if (end === -1) continue;
    const q = strip(section.slice(0, end));
    // Only genuine questions. A few headings are statements and would read as nonsense
    // in a Q&A block.
    if (!q.endsWith("?")) continue;

    const body = section.slice(end + 5);
    const paras = [...body.matchAll(/<p>([\s\S]*?)<\/p>/g)]
      .map((m) => strip(m[1]))
      .filter((t) => t.length > 40)
      .slice(0, 2);
    const a = paras.join(" ");
    if (a.length > 60) faqs.push({ q, a });
  }
  return faqs;
}

export function loadArticle(slug: string): { html: string; toc: TocEntry[]; faqs: ArticleFaq[] } {
  const file = path.join(process.cwd(), "content", "articles", `${slug}.html`);
  const raw = fs.readFileSync(file, "utf8").replace(BYLINE, "");

  const toc: TocEntry[] = [];
  const seen = new Set<string>();

  const html = raw.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .trim();
    let id = slugify(text);
    // Two headings can reasonably say the same thing; ids cannot.
    let n = 2;
    while (seen.has(id)) id = `${slugify(text)}-${n++}`;
    seen.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  /*
   * Each table gets a scroll container of its own. It has to be a real element rather than
   * `display: block` on the table, because a rounded, clipped corner needs a box that is not
   * also laying out rows — and on a phone these tables are far wider than the screen, so the
   * scroll has to live somewhere. The file on disk stays plain <table>.
   */
  const wrapped = html.replace(
    /<table>([\s\S]*?)<\/table>/g,
    '<div class="aj-table-wrap"><table>$1</table></div>',
  );

  return { html: wrapped, toc, faqs: extractFaqs(raw) };
}

/** Slugs of every published article file, for generateStaticParams and sanity checks. */
export function articleSlugs(): string[] {
  const dir = path.join(process.cwd(), "content", "articles");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html"))
    .map((f) => f.replace(/\.html$/, ""));
}
