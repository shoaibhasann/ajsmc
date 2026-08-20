import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { SpecialtiesGrid } from "@/components/specialties/SpecialtiesGrid";
import { breadcrumbSchema } from "@/lib/schema";
import { assets } from "@/lib/assets";
import { listedDoctors, specialties } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Specialities and Departments in Chennai",
  description: `The ${specialties.length} departments at AJSMC Egmore, Chennai: General Medicine, General Surgery, Ophthalmology, Dermatology, Pediatrics, Orthopedics, Urology, Obstetrics and Gynaecology, Diabetology, Reproductive Medicine, Psychology and Pathology.`,
  canonical: "/specialties",
});

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
        title={`${specialties.length} departments, one building in Egmore`}
        description={`${specialties.length} departments and ${listedDoctors.length} consultants, covering everyday illness through to day-care surgery. Costs are quoted before treatment starts.`}
        image={assets.aboutHeroBg}
        decoration={assets.specialtiesHeroDecor}
      />
      <SpecialtiesGrid />
      <CtaBand
        title="Not sure which department you need?"
        description="Call 044 2532 2021 and describe the problem. Our team will tell you which consultant to see."
      />
    </>
  );
}
