import { siteConfig } from "@/lib/site";

/**
 * Tells IndexNow which pages changed, so Bing (and Yandex, Seznam, Naver, which share
 * the same feed) recrawl them without waiting to rediscover the sitemap.
 *
 * Called on a schedule — see vercel.ts — and safe to call by hand.
 *
 * WHAT IT SUBMITS, AND WHY NOT EVERYTHING: IndexNow's guidance is to submit pages whose
 * content actually changed; a site that re-pushes its whole map on every run trains the
 * receiver to discount it. The sitemap's own `lastmod` is the change signal, and it is a
 * truthful one here — the static, doctor and department pages carry a hand-maintained
 * revision date and the articles carry their own review dates, so nothing moves unless
 * the copy did. This route submits the URLs whose lastmod falls inside a recent window
 * and nothing else.
 *
 * NO SECRET, ON PURPOSE: the worst an unauthenticated caller can do is ask Bing to
 * recrawl pages that are already public, from our own sitemap, to a fixed endpoint. There
 * is nothing to leak and nothing to destroy. What it could do is burn our IndexNow quota,
 * so the work is rate-limited below. If CRON_SECRET is set in the environment, Vercel's
 * scheduler sends it and we honour it as an extra gate; the route works without one.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** How far back a lastmod counts as "recently changed". A day's schedule with a week's
 *  window means a change still gets resubmitted if a run is missed or a deploy is late. */
const WINDOW_DAYS = 7;

/** IndexNow accepts 10,000 per request; this site has 59. The cap is a guard against a
 *  future sitemap explosion silently truncating, not a limit we expect to reach. */
const MAX_URLS = 10_000;

const KEY = "f7abb0e8bf7f4230a688c69c05e78a02";
const KEY_LOCATION = `${siteConfig.url}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// One run per hour is plenty for a site that deploys a few times a week, and it stops a
// loop or a curious visitor from spending the quota. Same per-instance caveat as the
// enquiry route: a best-effort guard, not a boundary.
let lastRunAt = 0;
const MIN_GAP_MS = 60 * 60 * 1000;

function parseSitemap(xml: string): { url: string; lastmod: string | null }[] {
  const entries: { url: string; lastmod: string | null }[] = [];
  for (const block of xml.split("<url>").slice(1)) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(block)?.[1]?.trim();
    if (!loc) continue;
    entries.push({ url: loc, lastmod: /<lastmod>([^<]+)<\/lastmod>/.exec(block)?.[1]?.trim() ?? null });
  }
  return entries;
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }
  }

  const { searchParams } = new URL(request.url);
  // ?all=1 resubmits the whole sitemap regardless of dates — for a domain move, a key
  // rotation, or the first run after this route is deployed.
  const all = searchParams.get("all") === "1";
  // ?dry=1 reports what it would submit without submitting, so a schedule can be checked.
  const dry = searchParams.get("dry") === "1";
  // ?days=N widens or narrows the window for one call. Useful for catching up after a
  // run of missed schedules, and it is what makes the date filter testable at all —
  // without it there is no way to prove the filter excludes anything until a page is
  // genuinely old.
  const daysParam = Number(searchParams.get("days"));
  const windowDays = Number.isFinite(daysParam) && daysParam > 0 ? Math.min(daysParam, 365) : WINDOW_DAYS;

  const now = Date.now();
  if (!dry && now - lastRunAt < MIN_GAP_MS) {
    return Response.json(
      { ok: false, error: "Ran too recently.", retryAfterMinutes: Math.ceil((MIN_GAP_MS - (now - lastRunAt)) / 60000) },
      { status: 429 },
    );
  }

  let entries: { url: string; lastmod: string | null }[];
  try {
    // Fetched over HTTP rather than importing sitemap.ts, so this submits exactly the
    // URLs that are actually being served — if a deploy broke the sitemap, this notices.
    const res = await fetch(`${siteConfig.url}/sitemap.xml`, { cache: "no-store" });
    if (!res.ok) throw new Error(`sitemap returned ${res.status}`);
    entries = parseSitemap(await res.text());
  } catch (err) {
    console.error("[indexnow] could not read the sitemap:", err);
    return Response.json({ ok: false, error: "Could not read the sitemap." }, { status: 502 });
  }

  if (entries.length === 0) {
    console.error("[indexnow] sitemap parsed to zero URLs — refusing to submit");
    return Response.json({ ok: false, error: "Sitemap parsed to zero URLs." }, { status: 502 });
  }

  const cutoff = now - windowDays * 24 * 60 * 60 * 1000;
  const selected = all
    ? entries.map((e) => e.url)
    : entries
        .filter((e) => {
          if (!e.lastmod) return false;
          const t = Date.parse(e.lastmod);
          return Number.isFinite(t) && t >= cutoff;
        })
        .map((e) => e.url);

  const urlList = selected.slice(0, MAX_URLS);
  if (selected.length > MAX_URLS) {
    console.warn(`[indexnow] ${selected.length} URLs selected, submitting the first ${MAX_URLS}`);
  }

  if (urlList.length === 0) {
    // The steady state on a quiet week, and not a problem — say so plainly rather than
    // reporting a failure the next person has to investigate.
    return Response.json({ ok: true, submitted: 0, reason: "nothing changed in the window", windowDays });
  }

  if (dry) {
    return Response.json({ ok: true, dryRun: true, windowDays, wouldSubmit: urlList.length, urls: urlList });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(siteConfig.url).host,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList,
      }),
    });
    lastRunAt = now;

    // 200 means accepted; 202 means accepted with key validation still pending. Both are
    // successes, and anything else is worth a log line rather than a silent shrug.
    const accepted = res.status === 200 || res.status === 202;
    if (!accepted) {
      console.error(`[indexnow] endpoint returned ${res.status} for ${urlList.length} URLs`);
    }
    return Response.json(
      { ok: accepted, status: res.status, submitted: accepted ? urlList.length : 0, of: entries.length },
      { status: accepted ? 200 : 502 },
    );
  } catch (err) {
    console.error("[indexnow] submission threw:", err);
    return Response.json({ ok: false, error: "Submission failed." }, { status: 502 });
  }
}
