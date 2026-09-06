"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { AJ_EASE } from "@/lib/motion";
import { listedDoctors, siteConfig, specialties } from "@/lib/site";

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

const stats = [
  { key: "docs", target: listedDoctors.length, label: "Specialist Doctors" },
  { key: "specs", target: specialties.length, label: "Speciality Departments" },
] as const;

export function AnimatedStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy">
      <Image
        src={assets.statsBg.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Light navy wash — enough to ground the figures without hiding the streaks. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy/[0.58] via-navy/[0.46] to-navy-mid/[0.52]"
      />
      <Container className="relative grid grid-cols-2 gap-6 py-[52px] sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Stat key={stat.key} index={i} target={stat.target} label={stat.label} plus={false} active={inView} showSeparator={i < stats.length - 1} />
        ))}
        <div className="text-center [text-shadow:0_2px_16px_rgba(7,32,79,0.9),0_1px_2px_rgba(7,32,79,0.7)]">
          <div className="font-heading text-[34px] font-extrabold tracking-tight text-green-bright sm:text-[44px] lg:text-[52px]">
            24/7
          </div>
          <div className="mt-1 font-body text-sm font-semibold text-white/85">Helpline Service</div>
        </div>
      </Container>
    </section>
  );
}

function Stat({
  index,
  target,
  label,
  plus,
  active,
  showSeparator,
}: {
  index: number;
  target: number;
  label: string;
  /**
   * Whether the figure is a floor rather than an exact count. Nothing in this band is one
   * any more: both remaining figures come from the roster and the department list, so "28+"
   * claimed more consultants than the page below goes on to name and contradicted the FAQ
   * on this same page. The years figure that used to sit here was removed outright — it
   * belonged to the chairman's practice, which began in 1975, not to the centre, which
   * opened in 2023, and a bare number in a stats band cannot say which it means.
   */
  plus: boolean;
  active: boolean;
  showSeparator: boolean;
}) {
  const value = useCountUp(target, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: AJ_EASE, delay: index * 0.1 }}
      className="relative text-center [text-shadow:0_2px_16px_rgba(7,32,79,0.9),0_1px_2px_rgba(7,32,79,0.7)]"
    >
      <div className="font-heading text-[34px] font-extrabold tracking-tight text-white sm:text-[44px] lg:text-[52px]">
        {value}
        {plus ? "+" : null}
      </div>
      <div className="mt-1 font-body text-sm font-semibold text-white/85">{label}</div>
      {showSeparator && (
        <span className="absolute -right-3 top-3 bottom-3 hidden w-px bg-white/25 sm:block" />
      )}
    </motion.div>
  );
}
