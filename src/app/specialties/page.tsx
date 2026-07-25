import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { SpecialtiesGrid } from "@/components/specialties/SpecialtiesGrid";
import { breadcrumbSchema } from "@/lib/schema";
import { assets } from "@/lib/assets";
import { siteConfig, specialties } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Specialties",
  description: `Explore the ${siteConfig.specialtyCount}+ departments at ${siteConfig.fullName} — Ophthalmology, Dermatology, Pediatrics, Orthopedics, Urology, Obstetrics & Gynaecology, General Medicine, Diabetology and more, all under one roof in Egmore, Chennai.`,
  alternates: { canonical: "/specialties" },
};

export default function SpecialtiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Specialties", path: "/specialties" },
        ])}
      />
      <PageHero
        crumb="Specialties"
        badge="CARE FOR EVERY PART OF YOU"
        title="Every specialty, under one roof"
        description={`${specialties.length} departments and ${siteConfig.doctorCount}+ specialist consultants — from everyday check-ups to focused treatment, with affordable, transparent care and no heavy charges.`}
        image={assets.aboutHeroBg}
        decoration={assets.specialtiesHeroDecor}
      />
      <SpecialtiesGrid />
      <CtaBand
        title="Not sure which specialty you need?"
        description="Call us and our team will point you to the right department — every specialty, one roof, affordable for all."
      />
    </>
  );
}
