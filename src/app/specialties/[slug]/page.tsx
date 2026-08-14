import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookCta } from "@/components/ui/BookCta";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SpecialtyIcon } from "@/components/ui/SpecialtyIcon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, specialtySchema } from "@/lib/schema";
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
  const title = `${specialty.name} in Egmore, Chennai`;

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

      <div className="px-3 pt-3 sm:px-4 sm:pt-4">
        <section
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]"
          style={{
            background:
              "radial-gradient(85% 120% at 88% 12%, rgba(23,196,107,0.20) 0%, rgba(23,196,107,0) 55%), linear-gradient(160deg, #E7F1FC 0%, #F4F9FD 60%, #E8F6EF 100%)",
          }}
        >
          <Container className="relative pb-14 pt-[104px] lg:pt-[116px]">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 font-body text-[13px] font-semibold text-muted"
            >
              <Link href="/" className="text-muted hover:text-navy">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              <Link href="/specialties" className="text-muted hover:text-navy">
                Specialties
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span className="font-bold text-navy">{specialty.name}</span>
            </nav>

            <SpecialtyIcon icon={specialty.icon} className="mb-5" />

            <h1 className="max-w-[760px] font-heading text-[34px] font-extrabold leading-[1.06] tracking-tight text-navy sm:text-[44px] lg:text-[52px]">
              {specialty.name} in {siteConfig.address.locality}, {siteConfig.address.city}
            </h1>
            <p className="mt-4 font-body text-[17px] font-semibold text-green-deep">
              {specialty.description}
            </p>
            <p className="mt-4 max-w-[620px] font-body text-base leading-relaxed text-body">
              {specialty.context}
            </p>
          </Container>
        </section>
      </div>

      <Container as="section" className="py-12 lg:py-16">
        <div className="mx-auto max-w-[760px]">
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

          <p className="mt-7 rounded-[16px] border border-navy/[0.08] bg-white p-4 font-body text-[12.5px] leading-relaxed text-muted">
            AJSMC does not run a casualty or trauma unit. In a life-threatening emergency — an
            accident, chest pain, stroke symptoms or heavy bleeding — call 108 or go directly to
            the nearest hospital with a 24-hour emergency department.
          </p>
        </div>
      </Container>

      <Container as="section" className="pb-4">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionBadge tone="green">
              {consultants.length === 1 ? "YOUR CONSULTANT" : "YOUR CONSULTANTS"}
            </SectionBadge>
            <h2 className="mt-4 font-heading text-[26px] font-extrabold tracking-tight text-navy sm:text-[32px]">
              {consultants.length === 1
                ? `Your consultant in ${specialty.name}`
                : `${consultants.length} consultants in ${specialty.name}`}
            </h2>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 font-body text-[15px] font-bold text-navy"
          >
            All doctors
            <ChevronRight className="h-4 w-4 text-green-deep" strokeWidth={2.6} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
          {consultants.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>

        <BookCta className="mt-12" />
      </Container>

      <Container as="section" className="py-14">
        <h2 className="mb-6 font-heading text-[22px] font-extrabold tracking-tight text-navy sm:text-[26px]">
          Other departments at AJSMC
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {others.map((s) => (
            <Link
              key={s.name}
              href={`/specialties/${specialtySlug(s.name)}`}
              className="inline-flex items-center gap-2 rounded-full border border-navy/[0.14] bg-white px-[18px] py-2.5 font-body text-sm font-bold text-[#3A4A63] transition-colors hover:border-navy/30 hover:text-navy"
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
