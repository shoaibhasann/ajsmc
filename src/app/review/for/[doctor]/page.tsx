import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { itemsForReviewer, reviewerSlugs } from "@/lib/review";
import { doctors, siteConfig } from "@/lib/site";

type Params = { params: Promise<{ doctor: string }> };

export function generateStaticParams() {
  return reviewerSlugs().map((doctor) => ({ doctor }));
}

/** Same rule as the article pages: unreviewed clinical drafts are never indexed. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { doctor: slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return {};

  const title = `Articles for review — ${doctor.name}`;
  const description = `Draft articles awaiting ${doctor.name}'s approval before they are published on the AJSMC website.`;

  return {
    title,
    description,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    /*
     * Overrides the site-wide Open Graph card. These links get forwarded one to
     * each consultant, and inheriting the root card made all eight preview
     * identically — nobody could tell which link was theirs. The card names the
     * doctor and says nothing clinical.
     */
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/review/for/${slug}`,
      type: "website",
    },
  };
}

/**
 * One link per consultant. A doctor with two articles waiting should get one message,
 * not two — this page is what that message points at.
 */
export default async function ReviewerPage({ params }: Params) {
  const { doctor: slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) notFound();

  const items = itemsForReviewer(slug);
  if (items.length === 0) notFound();

  // pt clears the fixed navbar pill, which is about 76px tall. Without it the red DRAFT
  // banner renders entirely behind the navbar and is never seen.
  return (
    <div className="bg-bg pb-24 pt-[88px] lg:pt-[96px]">
      <div className="bg-[#8A2B1E] px-5 py-3 text-center font-body text-[13px] font-bold text-white">
        DRAFTS FOR MEDICAL REVIEW — NOT PUBLISHED, NOT FOR PATIENTS
      </div>

      <Container className="max-w-[760px] pt-9">
        <p className="font-body text-[11.5px] font-bold uppercase tracking-[0.14em] text-green-deep">
          {siteConfig.fullName}
        </p>

        <h1 className="mt-3 font-heading text-[30px] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-[36px]">
          {doctor.name}
        </h1>
        <p className="mt-2 font-body text-[15px] text-muted">
          {doctor.role}
          {doctor.reg ? ` · ${doctor.reg}` : ""}
        </p>

        <p className="mt-6 font-body text-[16px] leading-relaxed text-body">
          {items.length === 1
            ? "There is one article waiting for your approval."
            : `There are ${items.length} articles waiting for your approval.`}{" "}
          Each is written for the AJSMC website and carries your name. Nothing is published,
          and your name does not appear anywhere on the site until you say so.
        </p>

        <p className="mt-3 font-body text-[15px] leading-relaxed text-body">
          Open each one below. At the top of every article you will find the specific points we
          could not settle ourselves and need you to decide, and the claims about AJSMC that only
          the hospital can confirm. The full article follows underneath.
        </p>

        {!doctor.reg && (
          <p className="mt-5 rounded-[14px] bg-[#FBF4DE] px-4 py-3 font-body text-[13.5px] leading-relaxed text-[#6B5410]">
            We do not have your registration number on file. Please send it — it appears beside
            your name on the published article, and it is the one detail a reader can verify for
            themselves.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3.5">
          {items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/review/${item.slug}`}
              className="group flex items-start gap-4 rounded-[18px] border border-navy/[0.1] aj-card p-5 transition-shadow hover:shadow-[0_20px_40px_-28px_rgba(12,46,110,0.55)]"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-soft-green font-body text-[14px] font-bold text-green-deep">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-[17px] font-bold leading-snug text-navy">
                  {item.title}
                </span>
                <span className="mt-1.5 block font-body text-[13.5px] leading-relaxed text-muted">
                  {item.questions.length} question
                  {item.questions.length === 1 ? "" : "s"} for you
                  {item.secondReviewer === slug ? " · you are the second reader" : ""}
                </span>
                <span className="mt-2.5 inline-flex items-center gap-1.5 font-body text-[13.5px] font-bold text-navy">
                  <FileText className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
                  Open the article
                  <ChevronRight
                    className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.6}
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-[18px] border border-navy/[0.1] aj-card p-5">
          <h2 className="font-heading text-[17px] font-bold text-navy">
            How to send your comments back
          </h2>
          <p className="mt-2 font-body text-[14.5px] leading-relaxed text-body">
            Whatever is easiest — mark up a printout, reply by email, or send a voice note on
            WhatsApp saying which paragraph and what should change. There is nothing to fill in
            on these pages.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-2 font-body text-[14px] font-semibold text-navy">
            <Phone className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
            {siteConfig.phone}
            <span className="font-normal text-muted">·</span>
            <a
              href={siteConfig.emailHref}
              className="font-semibold text-navy underline decoration-navy/25 underline-offset-2"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
