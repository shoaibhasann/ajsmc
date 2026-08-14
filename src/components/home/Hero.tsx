"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Sparkles, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { heroTransition } from "@/lib/motion";
import { listedDoctors, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    // Full-bleed on mobile; the inset rounded card only kicks in from sm up.
    <div className="sm:px-4 sm:pt-4">
    <section
      id="home"
      // svh, never dvh: `dvh` tracks the *live* viewport, so on a phone it grows and
      // shrinks continuously while the URL bar collapses on scroll — the hero resizes
      // under your finger and every section below it slides up and down with it. `svh`
      // is the URL-bar-visible height, so it is a constant and the page holds still.
      // From sm up it's the inset rounded card, kept slightly short so its rounded
      // bottom and the next section peek through.
      className="relative flex min-h-svh items-center overflow-hidden sm:min-h-[calc(100svh-5rem)] sm:rounded-[36px]"
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

      {/* The doctor is pinned to the section's bottom edge so she stands on it. She
          cannot live in the Container and still do that: the Container carries its own
          bottom padding and is centred inside the section, so anything in it floats
          clear of the edge by both of those amounts. Pinning her here instead, on a
          copy of the Container's own 1240px grid, keeps her in the right-hand column
          while her feet sit flush on the section's rounded bottom, which clips her. */}
      <motion.div
        initial={{ opacity: 0, x: 56 }}
        animate={{ opacity: 1, x: 0 }}
        transition={heroTransition.rightColumn}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] mx-auto hidden w-full max-w-[1240px] px-10 lg:block"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] gap-8">
          <div />
          {/* Height-driven: she runs the full height of the card less the clearance the
              floating navbar pill needs at the top. The 3:4 box matches the source
              exactly, so nothing is letterboxed and the badges pin to her, not to empty
              space. `max-w-full` is the guard for a tall, narrow desktop (~1024-1280px),
              where the column is too slim for the height the clamp wants — there the
              width wins and `object-bottom` keeps her feet on the edge regardless.

              The nudge right is a transform, not a margin: it shifts her without
              changing the box the badges are pinned to, so they travel with her and
              their offsets stay measured against her actual edges. */}
          <div className="relative mx-auto aspect-[3/4] h-[clamp(520px,calc(100svh_-_180px),740px)] max-w-full translate-x-10">
            <Image
              src={assets.heroDoctor.src}
              alt={assets.heroDoctor.alt}
              fill
              // Lazy on purpose — this block is display:none below lg, so phones
              // never fetch it.
              sizes="560px"
              className="object-contain object-bottom"
            />

            {/* Pulled just past her edges so they read as layered over her without
                covering her face. Kept off the top of the box so they clear the navbar
                pill, and off the very bottom so the card's rounded corner does not
                clip them. */}
            {[
              {
                value: `${siteConfig.yearsOfService}+ Years`,
                label: "Trusted Care",
                className: "-left-6 top-[10%]",
                delay: 0,
                iconBg: "bg-soft-green text-green-deep",
              },
              {
                value: "24/7",
                label: "Helpline Open",
                className: "-right-5 top-[16%]",
                delay: -2,
                iconBg: "bg-soft-blue text-blue",
              },
            ].map((badge) => (
              <motion.div
                key={badge.value}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                className={`absolute z-[4] flex items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-3 pr-4 shadow-[0_20px_40px_-22px_rgba(12,46,110,0.5)] ${badge.className}`}
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
              className="absolute bottom-[18%] -left-6 z-[4] flex items-center gap-2.5 rounded-2xl bg-navy py-2.5 pl-3 pr-[18px] shadow-[0_24px_44px_-20px_rgba(12,46,110,0.7)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-green-bright text-[#083b20]">
                <Stethoscope className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="whitespace-nowrap leading-[1.15]">
                <span className="block font-heading text-[17px] font-extrabold text-white">
                  {listedDoctors.length} Experts
                </span>
                <span className="block font-body text-[11px] font-medium text-white/70">Every Specialty</span>
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* pt clears the fixed navbar pill, which floats inside this card's top edge. The
          second grid column is left empty — the doctor is positioned above instead. */}
      <Container className="relative z-[3] grid grid-cols-1 items-center gap-8 pb-16 pt-[92px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-8 lg:pb-[76px] lg:pt-[104px]">
        {/* Entrance lives in `.aj-hero-copy` (globals.css) — it has to rise on a phone
            and slide in from lg up, and a motion component cannot switch on a
            breakpoint without re-mounting. Centred while stacked, left-aligned once
            the grid splits at lg. */}
        <div className="aj-hero-copy text-center lg:text-left">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-navy/[0.08] bg-white px-4 py-2.5 font-body text-[13px] font-bold text-navy shadow-[0_10px_24px_-16px_rgba(12,46,110,0.5)]">
            <Sparkles className="h-4 w-4 text-green" strokeWidth={2.2} />
            {/* The H1 below is the brand line and carries no keyword, so the category and
                the locality ride here instead, in the first text on the page. */}
            Multi Speciality Hospital in Egmore
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
              {listedDoctors.length} specialist doctors
            </strong>
            {" across 12 departments in "}
            {siteConfig.address.locality}, {siteConfig.address.city}. Consultations, day-care
            surgery, sleep studies and lab tests in one building.{" "}
            <strong className="font-bold text-navy">Every price quoted upfront.</strong>
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
        </div>
      </Container>
    </section>
    </div>
  );
}
