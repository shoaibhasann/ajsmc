import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { DoctorsClient } from "@/components/doctors/DoctorsClient";
import { assets } from "@/lib/assets";
import { breadcrumbSchema, physiciansSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Our Doctors in Chennai",
  description: "Meet the specialist consultants at AJ Subaitha Medical Centre, Egmore, Chennai. Ophthalmology, Orthopaedics, Paediatrics, Gynaecology, Diabetology, Dermatology, Urology and more, with qualifications listed for each.",
  canonical: "/doctors",
});

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
        // "for each" was not true: 11 of the 28 carry a registration number and 17 do not,
        // so the page promised the one credential a patient can actually go and verify and
        // then withheld it most of the time. Qualifications genuinely are on every profile;
        // the registration line is now scoped to where we hold it, and needs no edit once
        // the outstanding numbers come in.
        description="Filter by department to find the right consultant. Qualifications are listed on every profile, along with the Tamil Nadu Medical Council registration number where we hold it."
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
