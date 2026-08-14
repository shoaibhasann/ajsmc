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
  title: "Contact Us in Chennai",
  description: `AJSMC is at No.47 (31), Police Commissioner Office Road, Egmore, Chennai 600008. Call ${siteConfig.phone}, WhatsApp us, or book online. Consultations Monday to Saturday, 10am to 9pm.`,
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
        title="Reach AJSMC in Egmore, Chennai"
        description="We are on Police Commissioner Office Road, a short walk from Egmore station. Call, WhatsApp or use the form below to book. Consultations run Monday to Saturday, 10am to 9pm, and our helpline answers around the clock."
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
