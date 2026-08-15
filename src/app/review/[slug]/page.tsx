import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, CircleAlert, FileText, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  getReviewItem,
  reviewItems,
  reviewerOf,
  secondReviewerOf,
  type ReviewItem,
} from "@/lib/review";
import { siteConfig } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reviewItems.map((r) => ({ slug: r.slug }));
}

/**
 * Unreviewed medical writing. It must never be indexed, never be served to a patient
 * who stumbled on it, and never appear in the sitemap — the point of the page is that
 * nobody has confirmed yet that it is safe to say.
 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getReviewItem(slug);
  if (!item) return {};
  const reviewer = reviewerOf(item);
  const title = `For review: ${item.title}`;
  const description = reviewer
    ? `A draft article awaiting ${reviewer.name}'s approval before it is published on the AJSMC website.`
    : "A draft article awaiting a consultant's approval before publication.";

  return {
    title,
    description,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    // Named card rather than the site-wide one, for the same reason as the per-doctor
    // page: these get forwarded, and an identical preview on every link is useless.
    openGraph: { title, description, url: `${siteConfig.url}/review/${slug}`, type: "article" },
  };
}

function articleHtml(item: ReviewItem): string {
  const file = path.join(process.cwd(), "docs", "drafts", item.file);
  const raw = fs.readFileSync(file, "utf8");
  // Strip the leading HTML comment banner the drafts carry for anyone reading the repo.
  return raw.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
}

export default async function ReviewPage({ params }: Params) {
  const { slug } = await params;
  const item = getReviewItem(slug);
  if (!item) notFound();

  const reviewer = reviewerOf(item);
  const second = secondReviewerOf(item);
  const html = articleHtml(item);

  // pt clears the fixed navbar pill, which is about 76px tall. Without it the red DRAFT
  // banner renders entirely behind the navbar and is never seen.
  return (
    <div className="bg-bg pb-24 pt-[88px] lg:pt-[96px]">
      <div className="bg-[#8A2B1E] px-5 py-3 text-center font-body text-[13px] font-bold text-white">
        DRAFT FOR MEDICAL REVIEW — NOT PUBLISHED, NOT FOR PATIENTS
      </div>

      <Container className="max-w-[820px] pt-9">
        <p className="font-body text-[11.5px] font-bold uppercase tracking-[0.14em] text-green-deep">
          {siteConfig.fullName}
        </p>
        <h1 className="mt-3 font-heading text-[30px] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-[38px]">
          {item.title}
        </h1>

        {reviewer && (
          <div className="mt-6 rounded-[18px] border aj-card p-5">
            <p className="font-body text-[11.5px] font-bold uppercase tracking-[0.12em] text-green-deep">
              We are asking you to review this
            </p>
            <p className="mt-2 font-heading text-[19px] font-bold text-navy">{reviewer.name}</p>
            <p className="font-body text-[13.5px] text-muted">
              {reviewer.role}
              {reviewer.reg ? ` · ${reviewer.reg}` : ""}
            </p>
            {/* The registration number is the one credential on the page a reader can check
                independently. Where we do not hold it, say so here rather than publishing a
                byline that looks verifiable and is not. */}
            {!reviewer.reg && (
              <p className="mt-2 rounded-lg bg-[#FBF4DE] px-3 py-2 font-body text-[12.5px] leading-relaxed text-[#6B5410]">
                We do not have your registration number on file. Please send it — it appears
                beside your name on the published article, and it is the detail a reader can
                verify for themselves.
              </p>
            )}
            {second && (
              <p className="mt-2 font-body text-[13px] text-muted">
                Second reader: {second.name}
                {second.reg ? ` (${second.reg})` : ""}
              </p>
            )}
            <p className="mt-3 flex items-start gap-2 font-body text-[13.5px] leading-relaxed text-body">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-deep" strokeWidth={2.2} />
              Your name will not appear anywhere on the website until you tell us to publish it.
            </p>
          </div>
        )}

        <div className="mt-5 rounded-[18px] border aj-card p-5">
          <p className="font-body text-[11.5px] font-bold uppercase tracking-[0.12em] text-green-deep">
            Why this article exists
          </p>
          <p className="mt-2 font-body text-[15px] leading-relaxed text-body">{item.purpose}</p>
        </div>

        <section className="mt-8">
          <h2 className="font-heading text-[22px] font-extrabold tracking-tight text-navy">
            What we need you to decide
          </h2>
          <p className="mt-2 font-body text-[14.5px] leading-relaxed text-muted">
            These are the points we could not settle ourselves. Everything else has been checked
            against the sources listed at the bottom.
          </p>
          <ol className="mt-5 flex list-none flex-col gap-4 p-0">
            {item.questions.map((q, i) => (
              <li key={q.q} className="rounded-[16px] border aj-card p-5">
                <p className="font-heading text-[16px] font-bold leading-snug text-navy">
                  <span className="text-green-deep">{i + 1}.</span> {q.q}
                </p>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-muted">{q.why}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-[18px] border border-[#C9A227]/40 bg-[#FBF4DE] p-5">
          <h2 className="flex items-center gap-2 font-heading text-[17px] font-bold text-[#7A5E10]">
            <CircleAlert className="h-[18px] w-[18px]" strokeWidth={2.2} />
            Please confirm these are true of AJSMC
          </h2>
          <p className="mt-2 font-body text-[14px] leading-relaxed text-[#6B5410]">
            The article states these as fact. If any is wrong, the sentence has to change before it
            is published.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {item.factsToConfirm.map((f) => (
              <li key={f} className="flex gap-2.5 font-body text-[14px] leading-relaxed text-[#5C4A12]">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9821A]" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-[18px] border aj-card p-5">
          <h2 className="font-heading text-[17px] font-bold text-navy">How to send your comments</h2>
          <p className="mt-2 font-body text-[14.5px] leading-relaxed text-body">
            Whatever is easiest — mark up a printout, reply by email, or send a voice note on
            WhatsApp saying the paragraph and what should change. There is nothing to fill in on
            this page.
          </p>
          <p className="mt-3 flex items-center gap-2 font-body text-[14px] font-semibold text-navy">
            <Phone className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
            {siteConfig.phone}
            <span className="font-normal text-muted">·</span>
            <a href={siteConfig.emailHref} className="font-semibold text-navy underline decoration-navy/25 underline-offset-2">
              {siteConfig.email}
            </a>
          </p>
        </section>

        <hr className="my-10 border-navy/10" />

        <p className="mb-5 flex items-center gap-2 font-body text-[11.5px] font-bold uppercase tracking-[0.12em] text-green-deep">
          <FileText className="h-4 w-4" strokeWidth={2.2} />
          The article, as it would publish
        </p>

        <article className="aj-prose" dangerouslySetInnerHTML={{ __html: html }} />

        <section className="mt-12 rounded-[18px] border border-navy/[0.1] bg-surface p-5">
          <h2 className="font-heading text-[16px] font-bold text-navy">
            Sources the clinical content was built from
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {item.sources.map((s) => (
              <li key={s} className="font-body text-[13.5px] leading-relaxed text-muted">
                {s}
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
