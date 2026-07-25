import { Eye, HeartHandshake, Target, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { missionVisionValues } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  eye: Eye,
  "heart-handshake": HeartHandshake,
};

const toneClasses = {
  green: "bg-soft-green text-green-deep",
  blue: "bg-soft-blue text-blue",
};

export function MissionVisionValues() {
  return (
    <section className="border-y border-navy/[0.06] bg-white">
      <Container className="py-[66px]">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <SectionBadge tone="blue">WHAT DRIVES US</SectionBadge>
          <h2 className="mt-4 font-heading text-[28px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[34px] lg:text-[clamp(28px,3.4vw,42px)]">
            Our mission, vision &amp; values
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-3">
          {missionVisionValues.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.title} className="rounded-[22px] border border-navy/[0.08] bg-bg p-7">
                <span
                  className={`mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-2xl ${toneClasses[item.tone]}`}
                >
                  <Icon className="h-[26px] w-[26px]" strokeWidth={1.9} />
                </span>
                <h3 className="mb-2 font-heading text-[19px] font-bold text-navy">{item.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
