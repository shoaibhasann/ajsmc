import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /review/* holds draft medical articles that no consultant has signed off yet.
        // The pages already send `noindex`; this is the second lock, so a crawler does
        // not fetch unreviewed clinical advice published under a hospital's name at all.
        // Remove a path from here only when its article has gone live properly.
        disallow: "/review/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
