import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { loadArticle } from "@/lib/article-html";
import { blogPosts, getPost, getReviewer } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

/**
 * One route for every article. The bodies are HTML files under `content/articles/`, so a
 * new post is a file plus an entry in `blogPosts` — there is no page component to write,
 * and therefore none to forget.
 */
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const reviewer = getReviewer(post);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      // The reviewer is the credential a reader can verify, so name them here too.
      authors: reviewer ? [reviewer.name] : undefined,
      images: post.coverImage ? [{ url: post.coverImage.src }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { html, toc, faqs } = loadArticle(post.slug);

  return <ArticleLayout post={post} html={html} toc={toc} faqs={faqs} />;
}
