import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { BookCta } from "@/components/ui/BookCta";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { formatPostDate, getRelatedPosts, getReviewer, type BlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

/**
 * The shell every health article renders into: byline, medical-reviewer credit, the
 * key-takeaway answer box, the prose body, sources, and the booking CTA.
 *
 * The article body is passed as children so each post can lay itself out freely
 * (tables, callouts, comparison blocks) while the trust signals stay identical
 * everywhere — those are what make a hospital's health content credible rather than
 * just another anonymous page.
 */
export function ArticleLayout({
  post,
  children,
  sources,
}: {
  post: BlogPost;
  children: React.ReactNode;
  /** Primary references. Health claims should be traceable to a real source. */
  sources?: { label: string; href: string }[];
}) {
  const reviewer = getReviewer(post);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      <div className="px-3 pt-3 sm:px-4 sm:pt-4">
        <section
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]"
          style={{
            background:
              "radial-gradient(85% 120% at 88% 12%, rgba(23,196,107,0.20) 0%, rgba(23,196,107,0) 55%), linear-gradient(160deg, #E7F1FC 0%, #F4F9FD 60%, #E8F6EF 100%)",
          }}
        >
          <Container className="relative pb-12 pt-[104px] lg:pt-[116px]">
            <nav
              aria-label="Breadcrumb"
              className="mb-4.5 flex flex-wrap items-center gap-2 font-body text-[13px] font-semibold text-muted"
            >
              <Link href="/" className="text-muted hover:text-navy">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              <Link href="/blog" className="text-muted hover:text-navy">
                Health Library
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span className="font-bold text-navy">{post.category}</span>
            </nav>

            <SectionBadge tone="green">{post.category.toUpperCase()}</SectionBadge>

            <h1 className="mt-4.5 max-w-[820px] font-heading text-[32px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[42px] lg:text-[52px]">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[13px] font-semibold text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
                {post.updatedAt ? "Updated" : "Published"}{" "}
                {formatPostDate(post.updatedAt ?? post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
                {post.readingMinutes} min read
              </span>
            </div>
          </Container>
        </section>
      </div>

      <Container as="section" className="py-12 lg:py-16">
        <div className="mx-auto max-w-[760px]">
          {reviewer && (
            <div className="mb-8 flex items-start gap-4 rounded-[20px] border aj-card p-4 shadow-[0_18px_34px_-30px_rgba(12,46,110,0.6)]">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#EAF2FC] to-[#B9D4F0]">
                {reviewer.image ? (
                  <Image
                    src={reviewer.image}
                    alt={reviewer.name}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                ) : (
                  <ShieldCheck className="h-6 w-6 text-navy" strokeWidth={1.8} />
                )}
              </span>
              <div className="min-w-0">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-green-deep">
                  Medically reviewed
                </p>
                <p className="mt-0.5 font-heading text-[15px] font-bold text-navy">{reviewer.name}</p>
                <p className="font-body text-[12.5px] leading-snug text-muted">
                  {reviewer.role}
                  {reviewer.degree ? ` · ${reviewer.degree}` : ""}
                  {reviewer.reg ? ` · TNMC ${reviewer.reg}` : ""}
                </p>
              </div>
            </div>
          )}

          {post.keyTakeaway && (
            <div className="mb-9 rounded-[20px] border border-green/25 bg-soft-green p-5 sm:p-6">
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-green-deep">
                Short answer
              </p>
              <p className="mt-2 font-body text-[16.5px] font-semibold leading-relaxed text-ink">
                {post.keyTakeaway}
              </p>
            </div>
          )}

          <article className="aj-prose">{children}</article>

          {sources && sources.length > 0 && (
            <section className="mt-12 rounded-[20px] border border-navy/[0.08] bg-surface p-5 sm:p-6">
              <h2 className="font-heading text-[17px] font-bold text-navy">Sources</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {sources.map((s) => (
                  <li key={s.href} className="font-body text-[13.5px] leading-snug text-muted">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-navy underline decoration-navy/25 underline-offset-2 hover:decoration-navy"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-8 rounded-[16px] border aj-card p-4 font-body text-[12.5px] leading-relaxed text-muted">
            This article is for general information and is not a substitute for a consultation.
            If your symptoms are severe or worsening, contact a doctor. For emergencies at AJSMC,
            call{" "}
            <a href={siteConfig.phoneHref} className="font-bold text-navy">
              {siteConfig.phone}
            </a>{" "}
            — our emergency service runs 24 hours.
          </p>
        </div>
      </Container>

      <Container as="section" className="pb-4">
        <div className="mx-auto max-w-[760px]">
          <BookCta label="Book an Appointment" />
        </div>
      </Container>

      {related.length > 0 && (
        <Container as="section" className="py-12 lg:py-16">
          <h2 className="mb-6 font-heading text-[24px] font-extrabold tracking-tight text-navy sm:text-[30px]">
            Related reading
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-[20px] border aj-card p-5 transition-shadow hover:shadow-[0_26px_48px_-30px_rgba(12,46,110,0.5)]"
              >
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-green-deep">
                  {p.category}
                </span>
                <span className="mt-2 font-heading text-[16px] font-bold leading-snug text-navy">
                  {p.title}
                </span>
                <span className="mt-2 line-clamp-2 font-body text-[13px] leading-snug text-muted">
                  {p.description}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-navy">
                  Read
                  <ChevronRight
                    className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.6}
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
