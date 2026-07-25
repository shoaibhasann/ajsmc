"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { faqs } from "@/lib/site";

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Container as="section" id="faq" className="py-16 pt-8">
      <div className="mx-auto mb-9 flex max-w-[640px] flex-col items-center text-center">
        <SectionBadge tone="green">FAQ</SectionBadge>
        <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
          Questions, answered
        </h2>
        <p className="mt-4 max-w-[420px] font-body text-[15px] leading-relaxed text-muted">
          Everything you need to know before your visit. Still unsure? Our team is a call away.
        </p>
      </div>

      <div className="mx-auto flex max-w-[820px] flex-col gap-3.5">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className={`overflow-hidden rounded-[18px] border bg-white transition-shadow ${
                open ? "border-navy/[0.16] shadow-[0_22px_44px_-28px_rgba(12,46,110,0.5)]" : "border-navy/[0.08]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4.5 px-6 py-5 text-left font-heading text-base font-bold text-navy"
              >
                {item.q}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    open ? "rotate-[135deg] bg-navy text-green-bright" : "bg-soft-blue text-blue"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.6} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-[22px] font-body text-[15px] leading-relaxed text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
