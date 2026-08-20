import { List } from "lucide-react";
import type { TocEntry } from "@/lib/article-html";

/**
 * The article's headings, as jump links.
 *
 * Two different things depending on the width, which is why the placement lives here
 * rather than in the layout:
 *
 * On desktop it is a sticky rail beside the prose. `top-[104px]` clears the floating navbar
 * pill, and the max-height keeps a long list — one of these articles has seventeen headings
 * — scrollable inside its own box instead of running off the bottom of the screen.
 *
 * On a phone there is no room for a rail, so it sits in the normal flow between the summary
 * and the first heading, where it reads as a contents list rather than as furniture. Sticky
 * on a small screen would eat a third of the viewport for the whole scroll.
 */
export function ArticleToc({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 3) return null;

  // aria-label rather than aria-labelledby: the TOC renders twice per article
  // (mobile flow + desktop sidebar), and a shared id would be duplicated.
  return (
    <nav aria-label="On this page" className="aj-card rounded-[20px] border p-5">
      <p className="flex items-center gap-2 font-body text-[11px] font-bold uppercase tracking-[0.12em] text-green-deep">
        <List className="h-[15px] w-[15px]" strokeWidth={2.4} />
        On this page
      </p>
      <ol className="mt-3.5 flex flex-col gap-2.5 lg:max-h-[60vh] lg:overflow-y-auto lg:pr-1">
        {toc.map((item, i) => (
          <li key={item.id} className="flex gap-2.5">
            <span className="shrink-0 font-body text-[12px] font-bold tabular-nums text-green-deep">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${item.id}`}
              className="font-body text-[13.5px] font-medium leading-snug text-body transition-colors hover:text-navy"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
