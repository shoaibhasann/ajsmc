import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DoctorPhoto } from "@/components/ui/DoctorPhoto";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { doctors } from "@/lib/site";

const chairman = doctors[0];

export function Leadership() {
  return (
    <section className="border-t aj-card">
      <Container className="grid grid-cols-1 items-center gap-9 py-[66px] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-12">
        <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-tile-blue sm:min-h-[360px]">
          <DoctorPhoto doctor={chairman} sizes="(min-width: 1024px) 420px, 100vw" />
        </div>
        <div>
          <SectionBadge tone="green">LEADERSHIP</SectionBadge>
          <Quote className="my-3 h-10 w-10 text-green/[0.18]" fill="currentColor" strokeWidth={0} />
          <p className="mb-5 max-w-[560px] font-body text-[19px] font-medium leading-relaxed text-ink">
            &ldquo;We built AJSMC so that no family has to choose between quality care and
            affordability. Every speciality, one roof, treated like our own.&rdquo;
          </p>
          <div>
            <div className="font-heading text-lg font-extrabold text-navy">{chairman.name}</div>
            {/* green-deep, not green: this is read, and #17c46b on this card was 2.30:1. */}
            <div className="font-body text-[13px] font-semibold text-green-deep">
              Chairman &amp; Founder &middot; {chairman.specialty}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
