import Link from "next/link";
import { ArrowUpRight, Building2, Clock, Heart, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { whyChooseUs } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  heart: Heart,
  building: Building2,
  clock: Clock,
};

const toneClasses = {
  green: "bg-soft-green text-green-deep",
  blue: "bg-soft-blue text-blue",
};

export function WhyChooseUs() {
  return (
    <Container as="section" className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-13">
      <div>
        <SectionBadge tone="green">WHY AJSMC</SectionBadge>
        <h2 className="mt-4.5 font-heading text-[28px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[34px] lg:text-[clamp(28px,3.4vw,42px)]">
          Why families choose us
        </h2>
        <p className="mb-6.5 mt-4.5 max-w-[420px] font-body text-[15px] leading-[1.7] text-body">
          What a family needs in a year, in one place: experienced doctors, modern
          facilities and fair pricing, close to home.
        </p>
        <Link
          href="/#appointment"
          className="inline-flex items-center gap-2.5 rounded-full bg-navy py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-white shadow-[0_16px_30px_-16px_rgba(12,46,110,0.6)]"
        >
          Book an Appointment
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-green-bright text-[#083b20]">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2">
        {whyChooseUs.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.title} className="rounded-[20px] border border-navy/[0.08] bg-white p-[22px]">
              <span
                className={`mb-3.5 flex h-[46px] w-[46px] items-center justify-center rounded-[13px] ${toneClasses[item.tone]}`}
              >
                <Icon className="h-[23px] w-[23px]" strokeWidth={1.9} />
              </span>
              <h3 className="mb-1.5 font-heading text-base font-bold text-navy">{item.title}</h3>
              <p className="font-body text-[13px] leading-snug text-muted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
