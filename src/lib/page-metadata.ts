import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Builds a page's metadata with its OpenGraph and Twitter cards derived from its
 * own title and description.
 *
 * A page that sets only `title` and `description` inherits the root layout's
 * OpenGraph block wholesale — so it goes out announcing the home page's title.
 * That left seventeen pages, including all eleven department pages, telling
 * crawlers two different things about what they are: a unique <title> and the
 * home page's og:title. Google lists og:title among the sources it picks a title
 * link from, and the crawlers that read OpenGraph first — Bing, social cards,
 * the LLM crawlers — saw seventeen distinct pages as one.
 *
 * The brand suffix is added here rather than left to `title.template`, because
 * that template reaches the <title> element only and never openGraph.title.
 * Doctor profiles and articles already set their own OpenGraph and do not use
 * this helper.
 */
export function pageMetadata({
  title,
  description,
  canonical,
}: {
  /** The bare page title, without the brand suffix. */
  title: string;
  description: string;
  /** Root-relative path; `metadataBase` makes it absolute. */
  canonical: string;
}): Metadata {
  const social = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title: social, description, url: canonical, type: "website" },
    twitter: { card: "summary_large_image", title: social, description },
  };
}
