import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { InfoCards } from "@/components/contact/InfoCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapCard } from "@/components/contact/MapCard";
import { assets } from "@/lib/assets";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reach Us",
  description: `Contact ${siteConfig.fullName} in Egmore, Chennai. Call ${siteConfig.phone}, WhatsApp ${siteConfig.mobile}, or book an appointment online. Open Mon–Sat, 10am–9pm, with 24-hour emergency care.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Reach Us", path: "/contact" },
        ])}
      />
      <PageHero
        crumb="Reach Us"
        badge="WE'RE HERE TO HELP"
        title="Get in touch with AJSMC"
        description="Questions, appointments or emergencies — reach us by phone, WhatsApp or the form below. We're open six days a week, with 24-hour emergency care."
        image={assets.aboutHeroBg}
        decoration={assets.contactHeroDecor}
        decorationClassName="!w-[150px] !bottom-5 lg:!w-[200px] lg:!bottom-8"
      />
      <InfoCards />
      <Container as="section" id="form" className="grid grid-cols-1 items-stretch gap-6.5 py-16 pb-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ContactForm />
        <MapCard />
      </Container>
    </>
  );
}
