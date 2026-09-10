<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# After publishing or editing content

Content here means anything a reader sees: an article under `content/articles/`, a doctor or
department in `src/lib/site.ts`, the copy on a page, or `public/llms.txt`. Do all four of
these in the same session as the change — not as a follow-up someone has to remember.

## 1. Bump the sitemap's revision date

`src/app/sitemap.ts` carries `CONTENT_REVISED`, a hand-set date covering the static pages, the
consultant profiles and the department pages. It is deliberately not `new Date()`: a build
timestamp told Google every page changed on every deploy, and Google discounts `lastmod`
site-wide once it stops being accurate, which devalues the honest dates on the articles too.

So bump it by hand whenever the copy on any of those pages changes. Leaving it stale is the
same failure in the other direction — in September 2026 it sat at 21 August while 47 URLs had
been edited, telling crawlers nothing had moved.

Article dates come from `updatedAt ?? publishedAt`. Be careful with `updatedAt`: it feeds
`lastReviewed` in the MedicalWebPage schema, which asserts a **clinical re-review**. Set it
when a consultant has actually re-read the medical content. Do not set it for a factual
correction, a spelling fix or a copy edit — that claims a review that did not happen.

## 2. Submit to Bing and the other IndexNow engines

```
curl -s "https://ajsmc.in/api/indexnow?dry=1&days=7"   # what would go
curl -s "https://ajsmc.in/api/indexnow?days=7"         # send it
curl -s "https://ajsmc.in/api/indexnow?all=1"          # every URL, for a domain move or key rotation
```

One call covers Bing, Yandex, Seznam and Naver. The route reads the live sitemap and submits
only URLs whose `lastmod` falls inside the window, so step 1 has to happen first or this
submits nothing. It is rate-limited to one real run an hour. A daily cron at 02:30 UTC runs
the same route, but it is a backstop, not the mechanism — submit explicitly when you publish.

`CRON_SECRET` is not set on Vercel, so the endpoint is public. That is survivable — the worst
a caller can do is spend the IndexNow quota on pages that are already public — but setting it
closes the hole, and Vercel then sends the bearer token automatically with no code change.

## 3. Hand over the Google list

Google has no push equivalent. Give the user the URLs to submit in Search Console, ordered
new-first, and remember Request Indexing takes roughly ten to twelve a day — a full sweep of
the site runs across four or five days. `docs/gsc-indexing.md` holds the standing checklist;
update it rather than starting a new one, and tell the user to resubmit `sitemap.xml` first,
because that is what actually gets the long tail crawled.

## 4. Never claim a review that has not happened

`reviewedBy` renders a "Medically reviewed" badge with a named, registered doctor and emits
that doctor in the schema. It is the strongest trust signal on a health page. If an article
is live before its reviewer has read it, set `awaitingReview: true` — one gate in
`getReviewer` withholds the badge and the schema field together — and clear it on sign-off.
