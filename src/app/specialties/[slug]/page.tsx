import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookCta } from "@/components/ui/BookCta";
import { PageHero } from "@/components/ui/PageHero";
import { ConsultantCarousel } from "@/components/specialties/ConsultantCarousel";
import { SpecialtySummary } from "@/components/specialties/SpecialtySummary";
import { SpecialtyCovers, WhenToSee } from "@/components/specialties/SpecialtyDetail";
import { SpecialtyIcon } from "@/components/ui/SpecialtyIcon";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { assets } from "@/lib/assets";
import { articleFaqSchema, breadcrumbSchema, specialtySchema } from "@/lib/schema";
import { specialtyContent } from "@/lib/specialty-content";
import {
  doctorsInSpecialty,
  siteConfig,
  specialtySlug,
  specialtiesWithPages,
} from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return specialtiesWithPages.map((s) => ({ slug: specialtySlug(s.name) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const specialty = specialtiesWithPages.find((s) => specialtySlug(s.name) === slug);
  if (!specialty) return {};

  const consultants = doctorsInSpecialty(specialty.name);
  const title = `${specialty.name} in Chennai — AJSMC, Egmore`;

  return {
    title,
    description: `${specialty.name} at ${siteConfig.fullName}, Egmore, Chennai — ${specialty.description.toLowerCase()}. ${
      consultants.length === 1 ? "One consultant" : `${consultants.length} consultants`
    }, outpatient ${siteConfig.hoursShort}. Call ${siteConfig.phone}.`,
    alternates: { canonical: `/specialties/${slug}` },
  };
}

export default async function SpecialtyPage({ params }: Params) {
  const { slug } = await params;
  const specialty = specialtiesWithPages.find((s) => specialtySlug(s.name) === slug);
  if (!specialty) notFound();

  const consultants = doctorsInSpecialty(specialty.name);
  const others = specialtiesWithPages.filter((s) => s.name !== specialty.name).slice(0, 6);
  const content = specialtyContent[specialty.name];

  return (
    <>
      <JsonLd data={specialtySchema(specialty, consultants)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
          { name: specialty.name, path: `/specialties/${slug}` },
        ])}
      />
      {/* The questions on the page, in the form Google shows as People Also Ask and answer
          engines lift whole. Same source as the visible accordion, so they cannot diverge. */}
      {content && <JsonLd data={articleFaqSchema(content.faqs)} />}

      {/* Same hero as the rest of the site — background artwork, scrim and the corner
          decoration from the Specialties listing — rather than the bare gradient this
          page used to draw for itself. */}
      <PageHero
        crumb={specialty.name}
        parent={{ name: "Specialties", href: "/specialties" }}
        icon={<SpecialtyIcon icon={specialty.icon} />}
        title={`${specialty.name} in ${siteConfig.address.city}`}
        titleScale="compact"
        tagline={specialty.description}
        // No `description` here on purpose. It was specialty.context, and the summary card
        // below opens by saying the same thing more completely — the two sat one under the
        // other and a reader met the same sentence twice before reaching anything new.
        image={assets.aboutHeroBg}
        decoration={assets.specialtiesHeroDecor}
        // The green tagline under the heading is the smallest coloured text on any hero, and
        // it is the only one on a copy-left page. Against that fading scrim it measured
        // 3.29:1 at 1440px; the even scrim puts it over 4.5.
        scrim="even"
      >
        {content && <SpecialtySummary summary={content.summary} />}
      </PageHero>

      {content && (
        <SpecialtyCovers specialtyName={specialty.name} covers={content.covers} />
      )}
      {content && <WhenToSee specialtyName={specialty.name} items={content.whenToSee} />}

      {/* Department copy on the left, the consultants beside it on the right. Below lg the
          grid collapses to the two stacked rows it reads as on a phone.

          items-center, not items-start: the consultant column is the taller of the two, so
          top-aligning left the copy sitting high against a long card and the pair read as
          unrelated. Centred, the two columns balance on the same axis. */}
      <Container as="section" className="py-12 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-14">
        <div>
          <h2 className="font-heading text-[24px] font-extrabold tracking-tight text-navy sm:text-[28px]">
            {/* "a/an" cannot be hardcoded across 11 department names, so the article is
                avoided entirely rather than reading "a Orthopedics consultant". */}
            Seeing a consultant in {specialty.name} at AJSMC
          </h2>
          <div className="mt-5 flex flex-col gap-3 font-body text-[15px] text-body">
            <span className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2} />
              Outpatient consultations {siteConfig.hoursShort}. Consultants keep their own clinic
              hours inside that window, so call {siteConfig.phone} to check when the one you need
              is in.
            </span>
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2} />
              {siteConfig.address.full}
            </span>
            <a href={siteConfig.phoneHref} className="flex items-start gap-2.5 font-semibold text-navy">
              <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2} />
              {siteConfig.phone}
            </a>
          </div>

          <p className="mt-5 font-body text-[15px] leading-relaxed text-body">
            Bring any previous reports and the actual strips of the medicines you are taking — the
            packaging carries the strength, which the name alone does not. Tests ordered on the day
            are processed in the laboratory here, so most reports reach your consultant within the
            same visit.
          </p>

          <p className="mt-7 rounded-[16px] border aj-card p-4 font-body text-[12.5px] leading-relaxed text-muted">
            AJSMC does not run a casualty or trauma unit. In a life-threatening emergency — an
            accident, chest pain, stroke symptoms or heavy bleeding — call 108 or go directly to
            the nearest hospital with a 24-hour emergency department.
          </p>
        </div>

        <div>
          {/* No badge above this heading. It sat 48px tall above the h2, which pushed this
              column's heading that far below the left one — two headings side by side on
              different baselines, which read as a mistake rather than as two columns. The
              heading already says what the badge said. Same size as the left heading for
              the same reason. */}
          <h2 className="mb-6 font-heading text-[24px] font-extrabold tracking-tight text-navy sm:text-[28px]">
            {consultants.length === 1
              ? `Your consultant in ${specialty.name}`
              : `${consultants.length} consultants in ${specialty.name}`}
          </h2>

          <ConsultantCarousel doctors={consultants} />

          <Link
            href="/doctors"
            className="mt-6 inline-flex items-center gap-2 font-body text-[15px] font-bold text-navy"
          >
            All doctors
            <ChevronRight className="h-4 w-4 text-green-deep" strokeWidth={2.6} />
          </Link>
        </div>
        </div>

        <BookCta className="mt-14" />
      </Container>

      {content && (
        <Container as="section" id="faq" className="py-14 lg:py-16">
          <div className="mx-auto mb-9 flex max-w-[640px] flex-col items-center text-center">
            <SectionBadge tone="green">FAQ</SectionBadge>
            <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
              {specialty.name} questions, answered
            </h2>
            <p className="mt-4 max-w-[440px] font-body text-[15px] leading-relaxed text-muted">
              The things people ask before booking. Still unsure? Our team is a call away on{" "}
              {siteConfig.phone}.
            </p>
          </div>

          <FaqAccordion items={content.faqs} />
        </Container>
      )}

      <Container as="section" className="py-14">
        <h2 className="mb-6 font-heading text-[22px] font-extrabold tracking-tight text-navy sm:text-[26px]">
          Other departments at AJSMC
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {others.map((s) => (
            <Link
              key={s.name}
              href={`/specialties/${specialtySlug(s.name)}`}
              className="inline-flex items-center gap-2 rounded-full border aj-card px-[18px] py-2.5 font-body text-sm font-bold text-[#3A4A63] transition-colors hover:border-navy/30 hover:text-navy"
            >
              {s.name}
              <ChevronRight className="h-3.5 w-3.5 text-green-deep" strokeWidth={2.6} />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
