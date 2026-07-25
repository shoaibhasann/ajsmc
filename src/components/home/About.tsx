"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Phone, Plus } from "lucide-react";
import { AJ_EASE } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { assets } from "@/lib/assets";
import { aboutHighlights, siteConfig } from "@/lib/site";

export function About() {
  return (
    <Container as="section" id="about" className="grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-14">
      <motion.div
        initial={{ opacity: 0, x: -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: AJ_EASE }}
        className="relative min-h-[360px] overflow-hidden rounded-[26px] sm:min-h-[440px]"
      >
        <Image
          src={assets.hospitalBuilding.src}
          alt={assets.hospitalBuilding.alt}
          fill
          sizes="(min-width: 1024px) 552px, 100vw"
          className="object-cover"
        />
        {/* Glass card: low-alpha fill + heavy blur so the building shows through,
            a bright top-left edge, and a soft top sheen for the lit-glass look. */}
        <div className="absolute bottom-5 left-5 w-[210px] overflow-hidden rounded-[20px] border border-white/40 bg-white/[0.12] p-[18px] shadow-[0_24px_48px_-20px_rgba(12,46,110,0.55),inset_0_1px_0_0_rgba(255,255,255,0.55)] ring-1 ring-inset ring-white/15 backdrop-blur-lg backdrop-saturate-150">
          <span
            aria-hidden
            // Negative z keeps the sheen behind the text (backdrop-blur makes this
            // card a stacking context, so it stays contained within the card).
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-white/30 to-transparent"
          />
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-navy">
              <Plus className="h-4 w-4 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-heading text-sm font-extrabold tracking-wide text-navy">AJSMC</span>
          </div>
          <span className="font-body text-[11px] font-semibold tracking-[0.08em] text-muted">
            SERVING SINCE
          </span>
          <div className="my-0.5 mb-3.5 font-heading text-2xl font-extrabold text-navy">
            {siteConfig.founded}
          </div>
          <p className="font-body text-sm font-semibold leading-snug text-ink">
            Committed to your health and well-being.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: AJ_EASE, delay: 0.12 }}
        className="flex flex-col items-center text-center lg:items-start lg:text-left"
      >
        <SectionBadge tone="solid">ABOUT US</SectionBadge>
        <h2 className="mt-5 font-heading text-[32px] font-extrabold leading-[1.06] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
          YOUR TRUSTED MULTI-SPECIALTY HOSPITAL
        </h2>
        <p className="mt-5 max-w-[500px] font-body text-base leading-relaxed text-body">
          AJ Subaitha Medical Centre combines clinical expertise, modern technology and a
          patient-first approach to deliver accurate diagnosis and effective treatment &mdash;
          with <strong className="text-navy">every specialist under one roof</strong> and{" "}
          <strong className="text-navy">no heavy charges</strong>.
        </p>
        <div className="my-[26px] flex w-fit flex-col gap-3.5 text-left">
          {aboutHighlights.map((item) => (
            <div key={item} className="flex items-center gap-3 font-body text-[15px] font-semibold text-ink">
              <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-soft-green text-green-deep">
                <CheckCircle2 className="h-[15px] w-[15px]" strokeWidth={2.6} />
              </span>
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5.5 sm:gap-y-4 lg:justify-start">
          <a
            href="#specialties"
            className="aj-cta-wave inline-flex items-center gap-2.5 rounded-full bg-navy py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-white shadow-[0_16px_30px_-16px_rgba(12,46,110,0.6)]"
          >
            <span>Learn More</span>
            <span className="aj-cta-dot flex h-[38px] w-[38px] items-center justify-center rounded-full bg-green-bright text-[#083b20]">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-soft-blue text-blue">
              <Phone className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block font-body text-xs font-semibold text-muted">For Any Questions</span>
              <a href={siteConfig.mobileHref} className="block font-heading text-[17px] font-extrabold text-navy">
                {siteConfig.mobile}
              </a>
            </span>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
