import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <Container as="section" id="faq" className="py-16 pt-8">
      <div className="mx-auto mb-9 flex max-w-[640px] flex-col items-center text-center">
        <SectionBadge tone="green">FAQ</SectionBadge>
        <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
          Questions, answered
        </h2>
        <p className="mt-4 max-w-[420px] font-body text-[15px] leading-relaxed text-muted">
          Everything you need to know before your visit. Still unsure? Our team is a call away.
        </p>
      </div>

      <FaqAccordion items={faqs} />
    </Container>
  );
}
