"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Sparkles, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { heroTransition } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    // Full-bleed on mobile; the inset rounded card only kicks in from sm up.
    <div className="sm:px-4 sm:pt-4">
    <section
      id="home"
      // Mobile: dvh fills the *dynamic* viewport, so there's no gap when the URL bar
      // collapses. From sm up it's the inset rounded card, kept slightly short so its
      // rounded bottom and the next section peek through.
      className="relative flex min-h-dvh items-center overflow-hidden sm:min-h-[calc(100svh-5rem)] sm:rounded-[36px]"
      style={{
        // Also the placeholder tone while the artwork loads, so there is no flash.
        background: "linear-gradient(160deg, #E7F1FC 0%, #EEF5FC 45%, #E9F6F0 100%)",
      }}
    >
      {/* Portrait artwork on mobile, landscape on desktop. Both are lazy so the
          display:none one for the current breakpoint is never downloaded — a
          hero-region lazy image still loads promptly on first paint. */}
      <Image
        src={assets.heroBackgroundMobile.src}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center opacity-90 lg:hidden"
      />
      <Image
        src={assets.heroBackground.src}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none hidden select-none object-cover object-right opacity-90 lg:block"
      />

      {/* Brand scrim — tints the artwork blue→green→white and keeps the headline readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--aj-scrim-hero)" }}
      />

      {/* pt clears the fixed navbar pill, which floats inside this card's top edge. */}
      <Container className="relative z-[2] grid grid-cols-1 items-center gap-8 pb-16 pt-[92px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-8 lg:pb-[76px] lg:pt-[104px]">
        <motion.div
          initial={{ opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={heroTransition.leftColumn}
          // Centred while the column is stacked; left-aligned once the grid splits at lg.
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-navy/[0.08] bg-white px-4 py-2.5 font-body text-[13px] font-bold text-navy shadow-[0_10px_24px_-16px_rgba(12,46,110,0.5)]">
            <Sparkles className="h-4 w-4 text-green" strokeWidth={2.2} />
            Fast Treatment
          </span>

          <h1 className="mt-6 font-heading font-extrabold uppercase tracking-tight text-navy text-[46px] leading-[1.0] sm:text-[54px] sm:leading-[0.92] lg:text-[clamp(46px,6.1vw,84px)]">
            <span className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 sm:leading-none lg:items-start lg:justify-start">
              <span>Every</span>
              <span className="hidden h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green to-green-deep align-middle shadow-[0_14px_30px_-12px_rgba(23,196,107,0.7)] sm:inline-flex lg:h-16 lg:w-16">
                <Stethoscope className="h-7 w-7 text-white" strokeWidth={1.8} />
              </span>
              <span>Specialty</span>
            </span>
            <span className="block">One Roof</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[440px] font-body text-[16.5px] font-medium leading-[1.62] text-body sm:text-base sm:leading-relaxed lg:mx-0">
            {/* Explicit {" "} around inline <strong>: JSX drops the single space that
                sits between a closing tag and the text that follows it. */}
            <strong className="font-bold text-navy">
              {siteConfig.doctorCount}+ specialist doctors
            </strong>
            {", day-care surgery and 24-hour emergency care — all under one roof in "}
            {siteConfig.address.locality}, {siteConfig.address.city}.{" "}
            <strong className="font-bold text-navy">Every price quoted upfront</strong>, nothing
            hidden.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
            <a
              href="#appointment"
              className="aj-cta-wave inline-flex w-full items-center justify-center gap-3 rounded-full bg-navy py-3.5 pl-6 pr-2.5 font-body text-base font-bold text-white shadow-[0_18px_34px_-16px_rgba(12,46,110,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 sm:w-auto sm:justify-start sm:py-[9px] sm:pl-[26px] sm:pr-[9px]"
            >
              <span>Book Appointment</span>
              <span className="aj-cta-dot flex h-9 w-9 items-center justify-center rounded-full bg-green-bright text-[#083b20] sm:h-10 sm:w-10">
                <ArrowUpRight className="h-[17px] w-[17px]" strokeWidth={2.6} />
              </span>
            </a>
            <a
              href="#specialties"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy/15 bg-white/70 py-3.5 px-6 font-body text-[15px] font-bold text-navy backdrop-blur-sm transition-colors hover:border-navy/30 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 sm:w-auto sm:py-[13px]"
            >
              Explore Specialties
              <ChevronRight className="h-[17px] w-[17px] text-green-deep" strokeWidth={2.6} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={heroTransition.rightColumn}
          // Hidden until the grid actually splits into two columns — stacked under
          // the copy it just pushed the CTAs off-screen.
          className="relative hidden items-center justify-center lg:flex lg:min-h-[560px]"
        >
          {/* Tall arch: a full semicircle on top, but only a gentle radius on the
              bottom. A fully-rounded (pill) bottom pinched the doctor's shoulders —
              they're the widest part and sit exactly where the cap curves inward.
              The flatter bottom gives them straight wall to land against. */}
          <div className="relative h-[500px] w-[320px] shrink-0 overflow-hidden rounded-t-full rounded-b-[48px] border border-white/60 bg-gradient-to-b from-white/75 via-[#EAF3FB]/80 to-[#DDEAF7]/75 shadow-[0_34px_64px_-30px_rgba(12,46,110,0.45)] backdrop-blur-[2px]">
            <Image
              src={assets.doctorPortrait.src}
              alt={assets.doctorPortrait.alt}
              fill
              sizes="340px"
              // Fill + top-anchored: the head sits under the arch and any crop lands
              // on the lower torso, not the shoulders. Lazy on purpose — the column
              // is display:none below lg, so phones never fetch it.
              className="object-cover object-top"
            />
          </div>

          {[
            {
              value: `${siteConfig.yearsOfService}+ Years`,
              label: "Trusted Care",
              className: "left-[10%] top-[-6px]",
              delay: 0,
              iconBg: "bg-soft-green text-green-deep",
            },
            {
              value: "24/7 Care",
              label: "Emergency Ready",
              className: "right-[8%] top-[26px]",
              delay: -2,
              iconBg: "bg-soft-blue text-blue",
            },
          ].map((badge) => (
            <motion.div
              key={badge.value}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
              className={`absolute z-[4] hidden items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-3 pr-4 shadow-[0_20px_40px_-22px_rgba(12,46,110,0.5)] lg:flex ${badge.className}`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-[11px] ${badge.iconBg}`}>
                <Sparkles className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="whitespace-nowrap leading-[1.15]">
                <span className="block font-heading text-[17px] font-extrabold text-navy">{badge.value}</span>
                <span className="block font-body text-[11px] font-medium text-muted">{badge.label}</span>
              </span>
            </motion.div>
          ))}

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: -1 }}
            className="absolute bottom-3.5 left-[26%] z-[4] hidden items-center gap-2.5 rounded-2xl bg-navy py-2.5 pl-3 pr-[18px] shadow-[0_24px_44px_-20px_rgba(12,46,110,0.7)] lg:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-green-bright text-[#083b20]">
              <Stethoscope className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="whitespace-nowrap leading-[1.15]">
              <span className="block font-heading text-[17px] font-extrabold text-white">
                {siteConfig.doctorCount}+ Experts
              </span>
              <span className="block font-body text-[11px] font-medium text-white/70">Every Specialty</span>
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
    </div>
  );
}
