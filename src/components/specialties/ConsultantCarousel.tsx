"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { AJ_EASE } from "@/lib/motion";
import type { Doctor } from "@/lib/site";

const INTERVAL_MS = 4500;

/**
 * The consultants for a department, shown one at a time beside the department copy.
 *
 * A department with one consultant gets a plain card — a carousel of one is just a card
 * with extra machinery. With more than one it advances on its own, because the column is
 * a fixed height next to the text and a static grid there would either crop or stretch.
 *
 * It stops advancing on hover and on keyboard focus, so a reader who is looking at a card
 * is not moved off it, and it does not advance at all when the visitor asks for reduced
 * motion — an element that changes by itself is exactly what that setting is about.
 */
export function ConsultantCarousel({ doctors }: { doctors: Doctor[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % doctors.length);
  }, [doctors.length]);

  useEffect(() => {
    if (doctors.length < 2 || paused || reduceMotion) return;
    timer.current = setInterval(advance, INTERVAL_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [advance, doctors.length, paused, reduceMotion]);

  if (doctors.length === 0) return null;

  if (doctors.length === 1) {
    return <DoctorCard doctor={doctors[0]} />;
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/*
       * Fixed height matches DoctorCard, so the column does not jump as cards swap.
       *
       * No AnimatePresence here, deliberately. With `mode="wait"` it held the first card
       * forever: the index advanced and the dots followed it, but the exit animation never
       * resolved, so the outgoing card was never released and the incoming one never
       * mounted. Changing the key alone unmounts the old card and fades the new one in,
       * which is all this needs.
       */}
      <div className="relative h-[380px]">
        <motion.div
          key={doctors[index].slug}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: AJ_EASE }}
          className="absolute inset-0"
        >
          <DoctorCard doctor={doctors[index]} />
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5">
        {doctors.map((doctor, i) => {
          const active = i === index;
          return (
            <button
              key={doctor.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${doctor.name}`}
              aria-current={active}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${
                active ? "w-7 bg-navy" : "w-2 bg-navy/25 hover:bg-navy/45"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
