import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { assets } from "@/lib/assets";
import { BookCta } from "@/components/ui/BookCta";
import { JsonLd } from "@/components/JsonLd";
import { blogListingSchema, breadcrumbSchema } from "@/lib/schema";
import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Health Library",
  description: `Health guides from the doctors at ${siteConfig.fullName}, Egmore — symptoms, treatments, costs and when to see a specialist in Chennai.`,
  canonical: "/blog",
});

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
        image={assets.aboutHeroBg}
        decoration={assets.blogHeroDecor}
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
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <BookCta className="mt-12" />
      </Container>
    </>
  );
}
