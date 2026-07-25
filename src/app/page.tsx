import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/home/Hero";
import { SignatureServices } from "@/components/home/SignatureServices";
import { About } from "@/components/home/About";
import { AnimatedStats } from "@/components/home/AnimatedStats";
import { Specialties } from "@/components/home/Specialties";
import { DoctorsPreview } from "@/components/home/DoctorsPreview";
import { FacilitiesGallery } from "@/components/home/FacilitiesGallery";
import { Testimonials } from "@/components/home/Testimonials";
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
      <Testimonials />
      <Faq />
      <Appointment />
    </>
  );
}
