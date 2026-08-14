import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/home/Hero";
import { SignatureServices } from "@/components/home/SignatureServices";
import { About } from "@/components/home/About";
import { AnimatedStats } from "@/components/home/AnimatedStats";
import { Specialties } from "@/components/home/Specialties";
import { DoctorsPreview } from "@/components/home/DoctorsPreview";
import { FacilitiesGallery } from "@/components/home/FacilitiesGallery";
import { Faq } from "@/components/home/Faq";
import { Appointment } from "@/components/home/Appointment";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />
      <SignatureServices />
      <About />
      <AnimatedStats />
      <DoctorsPreview />
      <Specialties />
      <FacilitiesGallery />
      {/*
        <Testimonials /> is pulled from the homepage, for two independent reasons.

        The quotes were never real. Three invented patients with invented names were
        being presented to people choosing where to take a sick relative.

        And patient testimonials are not permitted to us in the first place. The Indian
        Medical Council (Professional Conduct, Etiquette and Ethics) Regulations 2002,
        reg. 6.1.1, bars a practitioner or their institution from boasting "of cases,
        operations, cures or remedies" or permitting "the publication of report thereof
        through any mode" — a website included. The CCPA's 2022 misleading-advertisement
        guidelines reach the hospital as advertiser and carry penalties of ₹10 lakh,
        rising to ₹50 lakh on repeat, and ASCI has already recorded ~190 upheld
        complaints against clinics and hospitals on exactly this ground.

        The component and its data are left in the tree so this is one line to undo, but
        real quotes would not make it lawful. What IS permitted, and is worth building
        in its place, is a fee-transparency section: reg. 7.12 expressly allows a
        hospital to publish "the fees", and cost queries are among the least served and
        most cited in search.
      */}
      <Faq />
      <Appointment />
    </>
  );
}
