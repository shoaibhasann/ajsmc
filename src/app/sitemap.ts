import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { doctors, siteConfig, specialtySlug, specialtiesWithPages } from "@/lib/site";

/**
 * The date the static pages, the roster and the department pages last had their
 * content edited. It is set by hand, on purpose.
 *
 * `new Date()` was used here before, which stamped every deploy time onto 45 of the
 * 59 entries and told Google that every page on the site changed whenever anything
 * shipped. Google only trusts lastmod while it is consistently accurate and
 * discounts it site-wide once it is not, so a build timestamp does not merely fail
 * to help these pages, it devalues the honest dates on the articles too. Bump this
 * when the copy actually changes.
 */
const CONTENT_REVISED = new Date("2026-08-21T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/specialties", "/doctors", "/blog", "/contact"];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Articles carry their own review date so crawlers see real freshness rather than a
  // build timestamp that would mark every page as changed on each deploy.
  const posts: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const consultants: MetadataRoute.Sitemap = doctors.map((doctor) => ({
    url: `${siteConfig.url}/doctors/${doctor.slug}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const departments: MetadataRoute.Sitemap = specialtiesWithPages.map((s) => ({
    url: `${siteConfig.url}/specialties/${specialtySlug(s.name)}`,
    lastModified: CONTENT_REVISED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...departments, ...consultants, ...posts];
}
