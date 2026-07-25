import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { DoctorsClient } from "@/components/doctors/DoctorsClient";
import { assets } from "@/lib/assets";
import { breadcrumbSchema, physiciansSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Doctors",
  description: `Meet the ${siteConfig.doctorCount}+ specialist doctors at ${siteConfig.fullName} across 12+ departments — Ophthalmology, Orthopedics, Pediatrics, Gynaecology, Diabetology and more, all under one roof in Egmore, Chennai.`,
  alternates: { canonical: "/doctors" },
};

export default function DoctorsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Doctors", path: "/doctors" },
        ])}
      />
      <JsonLd data={physiciansSchema()} />
      <PageHero
        crumb="Our Doctors"
        badge="MEET OUR EXPERT TEAM"
        title="Find the right specialist for you"
        description="15+ consultants across 12+ departments — every specialty under one roof, with affordable, transparent care and no heavy charges."
        image={assets.aboutHeroBg}
        decoration={assets.doctorsHeroDecor}
        decorationClassName="-rotate-[18deg]"
      />
      <DoctorsClient />
      <CtaBand
        title="Not sure which specialist to see?"
        description="Call us and our team will guide you to the right doctor — affordable care, every specialty, one roof."
      />
    </>
  );
}
