"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookCta } from "@/components/ui/BookCta";
import { Container } from "@/components/ui/Container";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { doctorSpecialtyFilters, listedDoctors } from "@/lib/site";
import { cn } from "@/lib/utils";

export function DoctorsClient() {
  const [filter, setFilter] = useState("All");

  const chips = useMemo(() => {
    const defs = ["All", ...doctorSpecialtyFilters];
    return defs
      .map((label) => ({
        label,
        count:
          label === "All" ? listedDoctors.length : listedDoctors.filter((d) => d.specialty === label).length,
      }))
      .filter((c) => c.count > 0 || c.label === "All");
  }, []);

  const filtered = filter === "All" ? listedDoctors : listedDoctors.filter((d) => d.specialty === filter);

  return (
    <Container as="section" className="py-16 pt-8">
      <div className="mb-8.5 flex flex-wrap gap-2.5">
        {chips.map((chip) => {
          const active = chip.label === filter;
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() => setFilter(chip.label)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-[18px] py-2.5 font-body text-sm font-bold transition-colors",
                active ? "border-navy bg-navy text-white" : "aj-card text-[#3A4A63]",
              )}
            >
              {chip.label}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-body text-xs font-bold",
                  active ? "bg-green-bright/90 text-[#083b20]" : "bg-soft-blue text-blue",
                )}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mb-5.5 font-body text-sm font-medium text-muted">
        Showing <strong className="text-navy">{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "doctor" : "doctors"} in <strong className="text-navy">{filter}</strong>
      </p>

      <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.slug}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
          >
            <DoctorCard doctor={doc} />
          </motion.div>
        ))}
      </div>

      <BookCta className="mt-12" />
    </Container>
  );
}
