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
  title: "About Us",
  description: `Founded in ${siteConfig.founded}, ${siteConfig.fullName} (AJSMC) has served families in Egmore, Chennai for over two decades with 15+ specialist doctors, day-care surgery and affordable, transparent pricing.`,
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
        title="Trusted multi-specialty care, one roof"
        description="AJ Subaitha Medical Centre has cared for families in Egmore for over two decades — combining specialist expertise, modern technology and genuinely affordable treatment."
        image={assets.aboutHeroBg}
        decoration={assets.aboutHeroDecor}
      />
      <Story />
      <MissionVisionValues />
      <WhyChooseUs />
      <Leadership />
      <CtaBand
        title="Your health, our priority"
        description="Visit us in Egmore or book an appointment today — affordable specialist care, every day of the week."
      />
    </>
  );
}
