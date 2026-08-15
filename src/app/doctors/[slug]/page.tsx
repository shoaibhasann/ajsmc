import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BookCta } from "@/components/ui/BookCta";
import { DoctorPhoto } from "@/components/ui/DoctorPhoto";
import { HeroSurface } from "@/components/ui/HeroSurface";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { JsonLd } from "@/components/JsonLd";
import { assets } from "@/lib/assets";
import { breadcrumbSchema, physicianSchema } from "@/lib/schema";
import { doctors, siteConfig, specialties } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return {};

  const title = `${doctor.name} — ${doctor.specialty} in Chennai | AJSMC Egmore`;
  return {
    title,
    description: `${doctor.name}, ${doctor.role} at ${siteConfig.fullName}, Egmore, Chennai.${
      doctor.degree ? ` ${doctor.degree}.` : ""
    } Outpatient consultations ${siteConfig.hoursShort}. Call ${siteConfig.phone} to book.`,
    alternates: { canonical: `/doctors/${doctor.slug}` },
    openGraph: { title, type: "profile" },
  };
}

export default async function DoctorPage({ params }: Params) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) notFound();

  // The department page this consultant belongs to, when the specialty is one AJSMC
  // publishes as a department. Consultant specialty tags are broader than the 12
  // departments, so this can legitimately be absent.
  const department = specialties.find((s) => s.name === doctor.specialty);

  const colleagues = doctors
    .filter((d) => d.specialty === doctor.specialty && d.slug !== doctor.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={physicianSchema(doctor)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Doctors", path: "/doctors" },
          { name: doctor.name, path: `/doctors/${doctor.slug}` },
        ])}
      />

      {/* Same backdrop as the Doctors listing this page is reached from — the artwork and
          the stethoscope in the corner — rather than the bare gradient it drew itself. */}
      <HeroSurface
        image={assets.aboutHeroBg}
        decoration={assets.doctorsHeroDecor}
      >
        <Container className="relative pb-12 pt-[104px] lg:pt-[116px]">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 font-body text-[13px] font-semibold text-navy"
            >
              <Link href="/" className="text-navy/80 hover:text-navy">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              <Link href="/doctors" className="text-navy/80 hover:text-navy">
                Doctors
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span className="font-bold text-navy">{doctor.name}</span>
            </nav>

            {/* Stretch from lg up so the portrait ends level with the copy beside it. It was
                a fixed 300px against a column that runs past 400 once the registration pill
                and the hours panel are there, which left the card floating short of the
                block it belongs to. Below lg the two stack, so the fixed height stays —
                there is nothing to match. */}
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-stretch lg:gap-12">
              <div className="relative mx-auto h-[300px] w-[240px] overflow-hidden rounded-[24px] border border-[#d3e3f5] bg-gradient-to-b from-[#EAF2FC] via-[#D6E6F7] to-[#B9D4F0] shadow-[0_26px_48px_-30px_rgba(12,46,110,0.5)] lg:mx-0 lg:h-full">
                <DoctorPhoto doctor={doctor} sizes="260px" />
              </div>

              {/* Capped so the copy stops short of the stethoscope in the corner. Without it
                  the column takes the full remaining width — about 1000px at 1440 — and the
                  longest line runs under the artwork, as well as being far past a comfortable
                  measure to read. */}
              <div className="lg:max-w-[620px]">
                {doctor.tag && <SectionBadge tone="green">{doctor.tag.toUpperCase()}</SectionBadge>}
                <h1 className="mt-4 font-heading text-[32px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[40px] lg:text-[46px]">
                  {doctor.name}
                </h1>
                {/* 19px bold for the same reason as the specialty tagline — see PageHero. */}
                <p className="mt-3 font-body text-[19px] font-bold text-green-deep">
                  {doctor.role}
                </p>
                {doctor.degree && (
                  <p className="mt-1.5 font-body text-[15px] leading-relaxed text-body">
                    {doctor.degree}
                  </p>
                )}

                {doctor.reg && (
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-navy/[0.12] bg-white/70 px-4 py-2 font-body text-[13px] font-semibold text-navy backdrop-blur-sm">
                    <BadgeCheck className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
                    Registered with the Tamil Nadu Medical Council · {doctor.reg}
                  </p>
                )}

                {/* On glass, like the summary card on a department page. These two lines sit
                    furthest right, where the scrim has faded, and at 14.5px they were the only
                    thing on any hero still short of 4.5:1 — 3.95:1 for the address. Giving the
                    block its own surface fixes that without dimming the artwork, which is the
                    whole point of the hero. */}
                <div className="aj-card-glass mt-7 flex flex-col gap-3 rounded-[18px] p-4 font-body text-[14.5px] text-body sm:p-5">
                  <span className="flex items-start gap-2.5">
                    <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2} />
                    Outpatient consultations {siteConfig.hoursShort}. Individual consultants keep
                    their own clinic hours within that window, so call ahead to confirm.
                  </span>
                  <span className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2} />
                    {siteConfig.address.full}
                  </span>
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-start gap-2.5 font-semibold text-navy"
                  >
                    <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2} />
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
        </Container>
      </HeroSurface>

      <Container as="section" className="py-12 lg:py-16">
        <div className="mx-auto max-w-[760px]">
          <h2 className="font-heading text-[24px] font-extrabold tracking-tight text-navy sm:text-[28px]">
            Booking an appointment with {doctor.name}
          </h2>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-body">
            {doctor.name} consults in {doctor.specialty} at {siteConfig.fullName} on Police
            Commissioner Office Road in {siteConfig.address.locality}, {siteConfig.address.city}.
            Appointments are taken by phone on {siteConfig.phone}, or through the form on this site.
            Walk-in patients are seen within outpatient hours, though calling ahead means less
            waiting.
          </p>
          <p className="mt-4 font-body text-[15.5px] leading-relaxed text-body">
            Bring any previous reports and the actual strips of the medicines you are taking rather
            than a written list — the packaging carries the strength, which the name alone does not.
          </p>

          {department && (
            <p className="mt-6 font-body text-[15px] text-body">
              More about this department:{" "}
              <Link href="/specialties" className="font-semibold text-navy underline decoration-navy/25 underline-offset-2 hover:decoration-navy">
                {department.name} at AJSMC
              </Link>
              .
            </p>
          )}

          <p className="mt-8 rounded-[16px] border aj-card p-4 font-body text-[12.5px] leading-relaxed text-muted">
            AJSMC does not run a casualty or trauma unit. In a life-threatening emergency — an
            accident, chest pain, stroke symptoms or heavy bleeding — call 108 or go directly to
            the nearest hospital with a 24-hour emergency department.
          </p>

          <BookCta className="mt-10" />
        </div>
      </Container>

      {colleagues.length > 0 && (
        <Container as="section" className="pb-16">
          <h2 className="mb-6 font-heading text-[22px] font-extrabold tracking-tight text-navy sm:text-[26px]">
            Other consultants in {doctor.specialty}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colleagues.map((c) => (
              <Link
                key={c.slug}
                href={`/doctors/${c.slug}`}
                className="group flex flex-col rounded-[20px] border aj-card p-5 transition-shadow hover:shadow-[0_26px_48px_-30px_rgba(12,46,110,0.5)]"
              >
                <span className="font-heading text-[16px] font-bold text-navy">{c.name}</span>
                <span className="mt-1 font-body text-[13px] font-semibold text-green-deep">
                  {c.role}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 font-body text-[13px] font-bold text-navy">
                  View profile
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
