"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SpecialtyIcon } from "@/components/ui/SpecialtyIcon";
import { AJ_EASE } from "@/lib/motion";
import { specialties } from "@/lib/site";

export function Specialties() {
  return (
    <Container as="section" id="specialties" className="py-16 pb-8">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionBadge tone="green">OUR SPECIALTIES</SectionBadge>
          <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
            {specialties.length} departments, one building
          </h2>
        </div>
        <p className="max-w-[360px] font-body text-[15px] leading-relaxed text-muted">
          From an everyday check-up to day-care surgery, the department you need is here in
          Egmore. Pick one to see what it covers and who you would be seeing.
        </p>
      </div>

      {/* Mobile: a two-row horizontal scroll-snap rail. The specialties already
          alternate green/blue, so grid-flow-col + two rows puts every green card in
          the top row and every blue card in the row below. From sm up it becomes a
          normal static grid. */}
      <div className="-mx-5 grid snap-x snap-mandatory auto-cols-[68%] grid-flow-col grid-rows-2 gap-4 overflow-x-auto py-1 pb-4 pl-8 pr-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:auto-cols-auto sm:snap-none sm:grid-flow-row sm:grid-cols-3 sm:grid-rows-none sm:gap-4.5 sm:overflow-visible sm:p-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {specialties.map((item, i) => {
          const isDark = item.tone === "dark";
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: AJ_EASE, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -5 }}
              className={`snap-start rounded-[20px] border p-5 shadow-[0_0_0_0_rgba(0,0,0,0)] transition-shadow hover:shadow-[0_22px_44px_-26px_rgba(12,46,110,0.4)] sm:p-[22px] ${
                isDark ? "border-navy bg-navy" : "border-navy/[0.08] aj-card"
              }`}
            >
              <SpecialtyIcon icon={item.icon} className="mb-3.5" />
              <h3 className={`mb-1 hyphens-auto break-words font-heading text-base font-bold leading-snug sm:text-lg ${isDark ? "text-white" : "text-navy"}`}>
                {item.name}
              </h3>
              <p className={`hyphens-auto break-words font-body text-[13px] leading-snug sm:text-sm ${isDark ? "text-white/70" : "text-muted"}`}>
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
