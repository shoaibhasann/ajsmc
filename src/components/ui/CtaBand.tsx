import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export function CtaBand({ title, description }: { title: string; description: string }) {
  return (
    <Container as="section" className="py-16">
      <div className="relative flex flex-wrap items-center justify-between gap-7 overflow-hidden rounded-[26px] bg-gradient-to-br from-navy to-navy-mid p-9 sm:p-11">
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-[200px] w-[200px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(52,208,88,0.35), transparent 68%)" }}
        />
        <div className="relative max-w-[560px]">
          <h2 className="mb-2 font-heading text-2xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-[32px] lg:text-[clamp(24px,3vw,36px)]">
            {title}
          </h2>
          <p className="font-body text-[15px] leading-relaxed text-white/78">{description}</p>
        </div>
        <div className="relative flex flex-wrap gap-3.5">
          <Link
            href="/#appointment"
            className="aj-cta-wave aj-cta-wave-invert inline-flex items-center gap-2.5 rounded-full aj-card py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-navy"
          >
            <span>Book Appointment</span>
            <span className="aj-cta-dot flex h-[38px] w-[38px] items-center justify-center rounded-full bg-green-bright text-[#083b20]">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
            </span>
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-white/30 px-[22px] py-[11px] font-body text-[15px] font-bold text-white"
          >
            <Phone className="h-[17px] w-[17px] text-green-bright" strokeWidth={2} />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </Container>
  );
}
