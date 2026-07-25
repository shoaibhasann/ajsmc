"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SpecialtyIcon } from "@/components/ui/SpecialtyIcon";
import { AJ_EASE } from "@/lib/motion";
import { specialties } from "@/lib/site";

export function SpecialtiesGrid() {
  return (
    <Container as="section" className="py-16 pt-11">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((item, i) => {
          const isDark = item.tone === "dark";
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: AJ_EASE, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -5 }}
              className={`flex flex-col rounded-[22px] border p-6 transition-shadow hover:shadow-[0_26px_48px_-28px_rgba(12,46,110,0.45)] ${
                isDark ? "border-navy bg-navy" : "border-navy/[0.08] bg-white"
              }`}
            >
              <SpecialtyIcon icon={item.icon} className="mb-4" />
              <h3 className={`font-heading text-lg font-bold leading-snug ${isDark ? "text-white" : "text-navy"}`}>
                {item.name}
              </h3>
              <p className={`mt-1 font-body text-[13px] font-semibold ${isDark ? "text-green-bright" : "text-green-deep"}`}>
                {item.description}
              </p>
              <p className={`mt-3 font-body text-[14px] leading-relaxed ${isDark ? "text-white/75" : "text-body"}`}>
                {item.context}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
