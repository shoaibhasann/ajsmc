import type { VercelConfig } from "@vercel/config/v1";

/**
 * Project configuration. Redirects, headers and image settings stay in next.config.ts —
 * this file exists for the things only the platform can do, which today is the schedule.
 */
export const config: VercelConfig = {
  crons: [
    {
      /**
       * Nudges IndexNow with whatever changed, so Bing and the other participating
       * engines recrawl a new or edited page within a day instead of waiting to
       * rediscover it.
       *
       * Daily, against the route's seven-day lastmod window: the overlap is deliberate,
       * so a missed run or a deploy that lands late still gets the change submitted
       * rather than dropping it. The route itself decides what qualifies and submits
       * nothing when nothing moved.
       *
       * 02:30 UTC is 08:00 IST — after the overnight deploys, before the clinic opens.
       */
      path: "/api/indexnow",
      schedule: "30 2 * * *",
    },
  ],
};

export default config;
