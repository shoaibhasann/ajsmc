import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/lib/site";

/**
 * Host and path canonicalisation, done at the edge before anything renders.
 *
 * Two duplicate-URL problems that a launch audit found, neither of which the app
 * router can solve on its own:
 *
 * 1. Route matching is case-insensitive, so /doctors/murali also answered 200 at
 *    /Doctors/murali, /DOCTORS/murali and every other permutation of the literal
 *    segments — each one indexable, each one a duplicate of the same page. Paths
 *    are lowercased and redirected once, permanently.
 *
 * 2. The project's own ajsmc.vercel.app alias served a byte-identical copy of the
 *    whole site at 200 with `index, follow`. rel=canonical pointed at the real
 *    host, but a canonical is a hint Google may ignore, so the copy stayed
 *    eligible for indexing. It is sent to the canonical host instead. Preview
 *    deployments are left alone — Vercel already noindexes those, and they are
 *    the thing you want reachable when a deploy needs checking.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host") ?? "";

  // The production alias only. Preview hosts look like <project>-<hash>-<team>.vercel.app
  // and must keep working, so this matches the bare alias exactly.
  if (host === "ajsmc.vercel.app") {
    return NextResponse.redirect(`${siteConfig.url}${pathname}${search}`, 308);
  }

  // Only literal segments vary in case; the slugs themselves are already lowercase,
  // so lowercasing the whole path is safe and idempotent.
  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Everything but Next's own build assets. sitemap.xml and robots.txt were
  // excluded once, which left them answering 200 on the vercel.app alias while
  // every HTML route redirected — the lowercase check is a no-op on paths that
  // are already lowercase, so there is nothing to save by skipping them.
  matcher: ["/((?!_next/).*)"],
};
