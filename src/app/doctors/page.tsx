import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { DoctorsClient } from "@/components/doctors/DoctorsClient";
import { assets } from "@/lib/assets";
import { breadcrumbSchema, physiciansSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Doctors in Chennai",
  description: "Meet the specialist consultants at AJ Subaitha Medical Centre, Egmore, Chennai. Ophthalmology, Orthopedics, Pediatrics, Gynaecology, Diabetology, Dermatology, Urology and more, with qualifications and TNMC registration listed.",
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
        title="Meet the consultants at AJSMC"
        description="Filter by department to find the right consultant, with qualifications and Tamil Nadu Medical Council registration numbers listed for each."
        image={assets.aboutHeroBg}
        decoration={assets.doctorsHeroDecor}
        decorationClassName="-rotate-[18deg]"
      />
      <DoctorsClient />
      <CtaBand
        title="Not sure which specialist to see?"
        description="Call 044 2532 2021, tell us what is troubling you, and our team will point you to the right consultant."
      />
    </>
  );
}
