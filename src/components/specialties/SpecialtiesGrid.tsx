"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SpecialtyIcon } from "@/components/ui/SpecialtyIcon";
import { AJ_EASE } from "@/lib/motion";
import { doctorsInSpecialty, specialties, specialtySlug } from "@/lib/site";

export function SpecialtiesGrid() {
  return (
    <Container as="section" className="py-16 pt-11">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((item, i) => {
          const isDark = item.tone === "dark";
          const consultants = doctorsInSpecialty(item.name);
          // A department only links onward once a consultant is listed under it. Linking a
          // department with nobody to staff it would promise a service we cannot name a
          // doctor for.
          const href = consultants.length > 0 ? `/specialties/${specialtySlug(item.name)}` : null;

          const body = (
            <>
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
              {href && (
                <span
                  className={`mt-4 inline-flex items-center gap-1.5 font-body text-[13.5px] font-bold ${
                    isDark ? "text-white" : "text-navy"
                  }`}
                >
                  {consultants.length === 1
                    ? "See the consultant"
                    : `See all ${consultants.length} consultants`}
                  <ChevronRight
                    className="h-4 w-4 text-green-deep transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.6}
                  />
                </span>
              )}
            </>
          );

          const className = `group flex flex-col rounded-[22px] border p-6 transition-shadow hover:shadow-[0_26px_48px_-28px_rgba(12,46,110,0.45)] ${
            isDark ? "border-navy bg-navy" : "border-navy/[0.08] bg-white"
          }`;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: AJ_EASE, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -5 }}
            >
              {href ? (
                <Link href={href} className={className}>
                  {body}
                </Link>
              ) : (
                <div className={className}>{body}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
