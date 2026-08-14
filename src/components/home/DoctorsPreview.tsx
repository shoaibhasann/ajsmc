"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BookCta } from "@/components/ui/BookCta";
import { Container } from "@/components/ui/Container";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AJ_EASE } from "@/lib/motion";
import { listedDoctors } from "@/lib/site";

// First four in roster order. Drawn from the listed set, so the preview can never
// feature someone the /doctors page it links to does not show.
const featured = listedDoctors.slice(0, 4);

export function DoctorsPreview() {
  return (
    <Container as="section" id="doctors" className="py-16 pb-8">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionBadge tone="green">MEET OUR EXPERT TEAM</SectionBadge>
          <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
            Doctors you can trust
          </h2>
        </div>
        <Link href="/doctors" className="inline-flex items-center gap-2.5 font-body text-[15px] font-bold text-navy">
          View all {listedDoctors.length} doctors
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-navy text-white">
            <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={2.6} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((doc, i) => (
          <motion.div
            key={doc.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: AJ_EASE, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <DoctorCard doctor={doc} />
          </motion.div>
        ))}
      </div>

      <BookCta className="mt-11" />
    </Container>
  );
}
