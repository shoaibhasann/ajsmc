"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * The accordion itself, lifted out of the home page FAQ so the specialty pages get the
 * same component rather than a second copy of it that drifts. Both callers keep their own
 * heading block above it — only the list is shared.
 */
// readonly, because the home page's list is declared `as const`.
export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto flex max-w-[820px] flex-col gap-3.5">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-[18px] border aj-card transition-shadow ${
              open
                ? "border-navy/[0.16] shadow-[0_22px_44px_-28px_rgba(12,46,110,0.5)]"
                : "border-navy/[0.08]"
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
                  <p className="px-6 pb-[22px] font-body text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
