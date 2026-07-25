"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AJ_EASE } from "@/lib/motion";
import { siteConfig, testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <Container as="section" id="testimonials" className="py-16 pt-8">
      <div className="mb-9 flex flex-col items-center gap-4 text-center lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-6 lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <SectionBadge tone="green">PATIENT STORIES</SectionBadge>
          <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
            What our patients say
          </h2>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-0.5 text-[#FFB020]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5" fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="font-heading text-lg font-extrabold text-navy">{siteConfig.rating.value} / 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: AJ_EASE, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className={`relative rounded-[22px] border p-7 transition-shadow ${
              t.dark
                ? "border-navy bg-navy hover:shadow-[0_26px_48px_-24px_rgba(12,46,110,0.7)]"
                : "border-navy/[0.08] bg-white hover:shadow-[0_26px_48px_-28px_rgba(12,46,110,0.5)]"
            }`}
          >
            <Quote
              className={`absolute right-6 top-[22px] h-[34px] w-[34px] ${t.dark ? "text-green-bright/35" : "text-green/[0.16]"}`}
              fill="currentColor"
              strokeWidth={0}
            />
            <div className={`mb-3.5 flex items-center gap-0.5 ${t.dark ? "text-[#FFC24D]" : "text-[#FFB020]"}`}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className={`mb-[22px] font-body text-[15px] leading-relaxed ${t.dark ? "text-white/90" : "text-[#3A4A63]"}`}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3.5">
              {/* Initial-letter avatar until real patient photos are added. */}
              <span
                aria-hidden
                className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-heading text-lg font-extrabold ${
                  t.dark ? "bg-white/[0.14] text-green-bright" : "bg-soft-blue text-navy"
                }`}
              >
                {t.name.charAt(0)}
              </span>
              <span className="leading-[1.25]">
                <span className={`block font-heading text-base font-bold ${t.dark ? "text-white" : "text-navy"}`}>
                  {t.name}
                </span>
                <span className={`block font-body text-[13px] font-semibold ${t.dark ? "text-green-bright" : "text-green"}`}>
                  {t.role}
                </span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
