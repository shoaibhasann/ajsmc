import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { doctors, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/specialties", "/doctors", "/blog", "/contact"];

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
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
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...consultants, ...posts];
}
