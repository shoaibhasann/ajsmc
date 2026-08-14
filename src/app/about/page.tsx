import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Story } from "@/components/about/Story";
import { MissionVisionValues } from "@/components/about/MissionVisionValues";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { Leadership } from "@/components/about/Leadership";
import { assets } from "@/lib/assets";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Hospital in Egmore",
  description: "About AJ Subaitha Medical Centre, a multi speciality hospital in Egmore, Chennai. 17 consultants, 12 departments, day-care surgery and an in-house lab, with costs quoted upfront.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
      <PageHero
        crumb="About Us"
        badge={`SERVING CHENNAI SINCE ${siteConfig.founded}`}
        title="A multi speciality hospital built around one idea"
        description="That a family should not have to cross Chennai, or pay heavily, to see a good specialist. So we put 17 of them in one building on Police Commissioner Office Road, Egmore."
        image={assets.aboutHeroBg}
        decoration={assets.aboutHeroDecor}
      />
      <Story />
      <MissionVisionValues />
      <WhyChooseUs />
      <Leadership />
      <CtaBand
        title="Come and see us in Egmore"
        description="Book a slot with the consultant you need, or just walk in between 10am and 9pm, Monday to Saturday."
      />
    </>
  );
}
