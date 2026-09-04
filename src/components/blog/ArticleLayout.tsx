import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronRight, Clock, RefreshCw, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroSurface } from "@/components/ui/HeroSurface";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ArticleCta } from "@/components/blog/ArticleCta";
import { JsonLd } from "@/components/JsonLd";
import { assets } from "@/lib/assets";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { articleFaqs } from "@/lib/article-faqs";
import { articleFaqSchema, articleSchema } from "@/lib/schema";
import { formatPostDate, getRelatedPosts, getReviewer, type BlogPost } from "@/lib/blog";
import type { ArticleFaq, TocEntry } from "@/lib/article-html";
import { siteConfig } from "@/lib/site";

/**
 * The shell every health article renders into: cover, byline, medical-reviewer credit, the
 * short-answer box, the contents rail, the prose body, sources and the booking CTA.
 *
 * The trust signals are identical on every article — a named reviewer with a registration
 * number, dates, sources — because those are what separate a hospital's health content
 * from anonymous content, for a reader and for the engines that decide whether to cite it.
 */
export function ArticleLayout({
  post,
  html,
  toc,
  faqs = [],
  sources,
}: {
  post: BlogPost;
  /** The article body, prepared by `loadArticle` at build time. */
  html: string;
  toc: TocEntry[];
  /** Question headings and their answers, emitted as FAQPage. */
  faqs?: ArticleFaq[];
  /** Primary references. Health claims should be traceable to a real source. */
  sources?: { label: string; href: string }[];
}) {
  const reviewer = getReviewer(post);
  /*
   * Two sets of questions, deliberately. The body's H2s are questions already and go into
   * the schema from the HTML; these are the ones a reader types after finishing it, and
   * none of them repeats a heading. Both feed the same FAQPage so an answer engine sees
   * one list rather than two.
   */
  const extraFaqs = articleFaqs[post.slug] ?? [];
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      {/* Every heading in these articles is a question and the prose under it is the answer,
          so the page already is an FAQ — this just says so in a form Google and the answer
          engines read. Built from the same HTML that renders, so the two cannot disagree. */}
      {faqs.length + extraFaqs.length > 0 && (
        <JsonLd data={articleFaqSchema([...faqs, ...extraFaqs])} />
      )}

      {/* The same hero as the Health Library these articles are reached from — artwork and
          the book in the corner — rather than a bare gradient that made an article look like
          a different site from the index above it. */}
      <HeroSurface image={assets.aboutHeroBg} decoration={assets.blogHeroDecor}>
        <Container className="relative pb-12 pt-[104px] lg:pt-[116px]">
          <nav
            aria-label="Breadcrumb"
            className="mb-4.5 flex flex-wrap items-center gap-2 font-body text-[13px] font-semibold text-navy"
          >
            <Link href="/" className="text-navy/80 hover:text-navy">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            <Link href="/blog" className="text-navy/80 hover:text-navy">
              Health Library
            </Link>
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            <span className="font-bold text-navy">{post.category}</span>
          </nav>

          <SectionBadge tone="green">{post.category.toUpperCase()}</SectionBadge>

          <h1 className="mt-4.5 max-w-[820px] font-heading text-[30px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[40px] lg:text-[48px]">
            {post.title}
          </h1>

          {/* The summary sits directly under the heading, before anything else, because it is
              the part that has to survive on its own — quoted in a search result, lifted by
              an answer engine, or read by someone who will not scroll. */}
          {post.keyTakeaway && (
            <div className="aj-card-glass mt-6 max-w-[720px] rounded-[20px] p-5 sm:p-6">
              <p className="font-body text-[11px] font-bold uppercase tracking-[0.12em] text-navy">
                In short
              </p>
              <p className="mt-2 font-body text-[16px] font-medium leading-relaxed text-body sm:text-[17px]">
                {post.keyTakeaway}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[13px] font-semibold text-body">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
              Published {formatPostDate(post.publishedAt)}
            </span>
            {post.updatedAt && (
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
                Last updated {formatPostDate(post.updatedAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
              {post.readingMinutes} min read
            </span>
          </div>
        </Container>
      </HeroSurface>

      <Container as="section" className="py-12 lg:py-16">
        {/*
         * Prose and a contents rail beside it. The rail is sticky and only exists from lg up;
         * below that the same component is rendered inline further down, in the flow, where
         * a phone can actually use it.
         */}
        <div className="mx-auto max-w-[1080px]">
          <div className="min-w-0">
            {post.coverImage?.src && (
              <figure className="mb-9 overflow-hidden rounded-[24px] border border-navy/[0.09]">
                <Image
                  src={post.coverImage.src}
                  alt={post.coverImage.alt}
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  // First thing in the body and the largest image on the page, so it is the
                  // LCP candidate on every article.
                  priority
                  className="h-auto w-full object-cover"
                />
              </figure>
            )}

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
                  <p className="mt-0.5 font-heading text-[15px] font-bold text-navy">
                    {reviewer.name}
                  </p>
                  <p className="font-body text-[12.5px] leading-snug text-muted">
                    {reviewer.role}
                    {reviewer.degree ? ` · ${reviewer.degree}` : ""}
                    {/* `reg` already reads "TNMC 126451" — prefixing it again printed
                        "TNMC TNMC 126451" on every article that has a registered reviewer. */}
                    {reviewer.reg ? ` · ${reviewer.reg}` : ""}
                  </p>
                </div>
              </div>
            )}

            {/* In the flow on a phone, between the reviewer credit and the first heading. */}
            <div className="mb-9 max-w-[740px]">
              <ArticleToc toc={toc} />
            </div>

            <article className="aj-prose" dangerouslySetInnerHTML={{ __html: html }} />

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

            {/*
             * AJSMC has no casualty unit and no emergency department — a fact this site
             * states plainly everywhere else. This notice used to end "our emergency service
             * runs 24 hours", which is the helpline, not an emergency service, and on a page
             * a frightened person may be reading at 2am that difference is the whole point.
             */}
            <p className="mt-8 rounded-[16px] border aj-card p-4 font-body text-[12.5px] leading-relaxed text-muted">
              This article is for general information and is not a substitute for a
              consultation. AJSMC does not run a casualty or trauma unit — in a
              life-threatening emergency call 108 or go directly to the nearest hospital with a
              24-hour emergency department. For appointments and questions our helpline is
              answered 24 hours on{" "}
              <a href={siteConfig.phoneHref} className="font-bold text-navy">
                {siteConfig.phone}
              </a>
              .
            </p>

            <div className="mt-10">
              <ArticleCta />
            </div>
          </div>

        </div>
      </Container>

      {extraFaqs.length > 0 && (
        <Container as="section" className="pb-20 pt-10 lg:pb-28 lg:pt-14">
          {/* Centred over the accordion, the way the FAQ on the home page and the department
              pages already sits. Left-aligned it read as the start of another prose section
              rather than as the head of the list under it. */}
          <div className="mx-auto mb-9 flex max-w-[640px] flex-col items-center text-center">
            <SectionBadge tone="green">FAQ</SectionBadge>
            <h2 className="mt-4.5 font-heading text-[26px] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-[32px]">
              Questions people ask after reading this
            </h2>
          </div>
          <FaqAccordion items={extraFaqs} />
        </Container>
      )}

      {related.length > 0 && (
        <Container as="section" className="pb-12 pt-2 lg:pb-16 lg:pt-4">
          <h2 className="mb-6 font-heading text-[24px] font-extrabold tracking-tight text-navy sm:text-[30px]">
            Related reading
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
