import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * What to do next, at the foot of an article.
 *
 * This replaced a lone navy pill that said "Book an Appointment" and nothing else. Someone
 * who has just read two thousand words about their own symptoms has a specific next step in
 * mind, and it is not always a form: some want to phone, some want WhatsApp because it is
 * after hours, and some want to know where the place is before committing to anything. All
 * three are here, so nobody has to go hunting in the footer.
 *
 * Navy rather than the card gradient, deliberately. Every other block on this page is a pale
 * card; the one asking for an action should not look like another paragraph of them.
 */
export function ArticleCta({ department }: { department?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-navy p-7 shadow-[0_30px_60px_-34px_rgba(12,46,110,0.75)] sm:p-9">
      {/* Same brand ramp the navy service cards use, plus a soft green bloom in the corner
          so the block reads as brand rather than as a plain dark box. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 92% 8%, rgba(52,208,88,0.28) 0%, rgba(52,208,88,0) 58%), linear-gradient(225deg, #143A86 0%, #0C2E6E 48%, #0A2657 100%)",
        }}
      />

      <div className="relative">
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-green-bright">
          Talk to a doctor
        </p>
        <h2 className="mt-3 max-w-[520px] font-heading text-[24px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[30px]">
          Still not sure what applies to you?
        </h2>
        <p className="mt-3 max-w-[540px] font-body text-[15px] leading-relaxed text-white/75">
          An article can tell you what usually happens. It cannot examine you.{" "}
          {department
            ? `Bring your reports to a ${department} consultant at AJSMC in ${siteConfig.address.locality}`
            : `Bring your reports to a consultant at AJSMC in ${siteConfig.address.locality}`}{" "}
          and get an answer about your own case.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/contact#form"
            className="aj-cta-wave aj-cta-wave-invert inline-flex items-center gap-2.5 rounded-full bg-white py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-navy"
          >
            <span>Book an appointment</span>
            <span className="aj-cta-dot flex h-9 w-9 items-center justify-center rounded-full bg-green-bright text-[#083b20]">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
            </span>
          </Link>

          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-body text-[14.5px] font-bold text-white transition-colors hover:bg-white/20"
          >
            <MessageCircle className="h-[17px] w-[17px] text-green-bright" strokeWidth={2.2} />
            WhatsApp
          </a>

          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 font-body text-[14.5px] font-bold text-white transition-colors hover:bg-white/20"
          >
            <Phone className="h-[17px] w-[17px] text-green-bright" strokeWidth={2.2} />
            {siteConfig.phone}
          </a>
        </div>

        {/* The two things people ask before they book. */}
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-white/15 pt-5 font-body text-[13px] text-white/70">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-green-bright" strokeWidth={2.2} />
            {siteConfig.hoursShort}
          </span>
          <a
            href={siteConfig.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <MapPin className="h-4 w-4 shrink-0 text-green-bright" strokeWidth={2.2} />
            {siteConfig.address.full}
          </a>
        </div>
      </div>
    </div>
  );
}
