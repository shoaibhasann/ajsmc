import { Phone, Siren } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function MapCard() {
  return (
    <div className="flex flex-col gap-4.5">
      <div className="relative min-h-[340px] flex-1 overflow-hidden rounded-[26px] border border-navy/[0.08]">
        <iframe
          src={siteConfig.mapsEmbed}
          title={`${siteConfig.fullName} location on Google Maps`}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        {/* Address + directions overlay; pointer-events-none lets the map stay draggable,
            while the button itself re-enables clicks. */}
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3.5 rounded-2xl bg-white/[0.94] px-[18px] py-4 shadow-[0_18px_34px_-22px_rgba(12,46,110,0.5)] backdrop-blur-md">
          <div>
            <div className="font-heading text-[15px] font-bold text-navy">{siteConfig.fullName}</div>
            <div className="font-body text-xs font-medium text-muted">Egmore, Chennai &ndash; 600008</div>
          </div>
          <a
            href={siteConfig.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-navy px-4 py-2.5 font-body text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Get Directions
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-[20px] bg-navy px-6 py-[22px]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-green-bright/[0.18] text-green-bright">
          <Siren className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <div className="flex-1">
          <div className="font-heading text-base font-bold text-white">24 Hours Service</div>
          <div className="font-body text-[13px] font-medium text-white/72">
            Our helpline answers at any hour. For a life-threatening emergency, call 108.
          </div>
        </div>
        <a
          href={siteConfig.phoneHref}
          aria-label={`Call ${siteConfig.fullName}`}
          className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-green-bright text-[#083b20]"
        >
          <Phone className="h-5 w-5" strokeWidth={2.2} />
        </a>
      </div>
    </div>
  );
}
