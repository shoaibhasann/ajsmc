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
        There is no testimonials section here, for two independent reasons.

        The quotes were never real. Three invented patients with invented names were
        being presented to people choosing where to take a sick relative. The component
        and its data have now been deleted outright rather than left commented out, so
        the invented version cannot be restored by uncommenting a line.

        And patient testimonials are not permitted to us in the first place. The Indian
        Medical Council (Professional Conduct, Etiquette and Ethics) Regulations 2002,
        reg. 6.1.1, bars a practitioner or their institution from boasting "of cases,
        operations, cures or remedies" or permitting "the publication of report thereof
        through any mode" — a website included. The CCPA's 2022 misleading-advertisement
        guidelines reach the hospital as advertiser and carry penalties of ₹10 lakh,
        rising to ₹50 lakh on repeat, and ASCI has already recorded ~190 upheld
        complaints against clinics and hospitals on exactly this ground.

        So real quotes would not make an on-site testimonials section lawful either. The
        route to visible social proof is the Google Business Profile, where reviews are
        the patients' own and attributable — the Testimonials heading already linked
        there instead of printing a self-reported score.

        A fee-transparency section would be the other permitted trust signal under
        reg. 7.12, but the client has asked that no fees or charges be published on this
        site. Do not add one without that decision being reversed in writing.
      */}
      <Faq />
      <Appointment />
    </>
  );
}
