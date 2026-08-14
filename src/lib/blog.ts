import { doctors, type Doctor } from "@/lib/site";

/**
 * Health-library articles.
 *
 * Each post is a hand-authored page under `src/app/blog/<slug>/page.tsx` — no CMS, no
 * database, so every article prerenders to static HTML. This file is the registry the
 * listing, sitemap, related-links and JSON-LD all read from, so a post exists in exactly
 * one place and the pieces can never drift apart.
 *
 * To add an article: add an entry here, then create the matching folder with a page.tsx
 * that renders <ArticleLayout post={...}>.
 */
export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description + listing excerpt. Write it as a real answer, not a teaser. */
  description: string;
  category: BlogCategory;
  /** ISO date. Drives schema `datePublished` and the visible byline. */
  publishedAt: string;
  /** ISO date. Set whenever the medical content materially changes. */
  updatedAt?: string;
  /**
   * Slug of the AJSMC doctor who reviewed the article. Health content is YMYL — a named,
   * credentialed reviewer is what separates this from anonymous content, for both Google
   * and the AI engines that cite sources.
   */
  reviewedBy?: string;
  readingMinutes: number;
  /** The one query this page is written to win. */
  primaryKeyword?: string;
  /**
   * A single self-contained sentence answering the title's question. Rendered at the top
   * of the article and reused as the schema description — this is the sentence an AI
   * engine can lift verbatim, so it must stand alone without surrounding context.
   */
  keyTakeaway?: string;
  /** Surfaces the post in the featured slot on the listing page. */
  featured?: boolean;
};

export type BlogCategory =
  | "General Health"
  | "Emergency Care"
  | "Lifestyle Diseases"
  | "Infectious Diseases"
  | "Women's Health"
  | "Men's Health"
  | "Child Health"
  | "Senior Health"
  | "Mental Health"
  | "Treatments & Costs";

/**
 * Published articles, newest intent first. Order here is the order on the listing page.
 */
export const blogPosts: BlogPost[] = [];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getReviewer(post: BlogPost): Doctor | undefined {
  if (!post.reviewedBy) return undefined;
  return doctors.find((d) => d.slug === post.reviewedBy);
}

/**
 * Up to `limit` other posts to link at the end of an article — same category first, then
 * anything else, so a thin category still produces internal links rather than none.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return blogPosts.slice(0, limit);
  const others = blogPosts.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategories(): BlogCategory[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}

/** "14 August 2026" — matches the byline and the listing card. */
export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
