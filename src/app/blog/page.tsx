import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { BookCta } from "@/components/ui/BookCta";
import { JsonLd } from "@/components/JsonLd";
import { blogListingSchema, breadcrumbSchema } from "@/lib/schema";
import { blogPosts, formatPostDate } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Health Library",
  description: `Health guides from the doctors at ${siteConfig.fullName}, Egmore — symptoms, treatments, costs and when to see a specialist in Chennai.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Health Library", path: "/blog" },
        ])}
      />
      <JsonLd data={blogListingSchema(blogPosts)} />

      <PageHero
        crumb="Health Library"
        badge="WRITTEN & REVIEWED BY OUR DOCTORS"
        title="Health guides from our specialists"
        description="Plain answers to the questions patients ask us most — what a symptom means, when it needs a doctor, what treatment involves, and what it costs at AJSMC."
      />

      <Container as="section" className="py-12 lg:py-16">
        {blogPosts.length === 0 ? (
          <p className="mx-auto max-w-[560px] text-center font-body text-[15px] leading-relaxed text-muted">
            Our first health guides are being reviewed by our specialists and will appear here
            shortly. In the meantime, our team is available six days a week — call{" "}
            <a href={siteConfig.phoneHref} className="font-bold text-navy">
              {siteConfig.phone}
            </a>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-[22px] border border-navy/[0.08] aj-card p-6 transition-shadow hover:shadow-[0_26px_48px_-30px_rgba(12,46,110,0.5)]"
              >
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-green-deep">
                  {post.category}
                </span>
                <h2 className="mt-2.5 font-heading text-[18px] font-bold leading-snug text-navy">
                  {post.title}
                </h2>
                <p className="mt-2.5 line-clamp-3 font-body text-[13.5px] leading-relaxed text-muted">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-navy/[0.07] pt-3.5">
                  <span className="font-body text-[12px] font-medium text-faint">
                    {formatPostDate(post.updatedAt ?? post.publishedAt)} · {post.readingMinutes} min
                  </span>
                  <ChevronRight
                    className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.6}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        <BookCta className="mt-12" />
      </Container>
    </>
  );
}
