"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navy panel with an animated ECG trace and a glass badge. Lifted out of the
 * hero so it can be dropped into any section.
 *
 * Sizing/placement comes from `className` (it defaults to the hero's original
 * 262x326). `cn` is a plain join, so a caller overriding the size should not
 * rely on class order — wrap it instead if you need a very different box.
 */
export function DiagnosticsCard({
  eyebrow = "Sleep Study",
  badge = "Advanced Diagnostics",
  className,
}: {
  eyebrow?: string;
  badge?: string;
  className?: string;
}) {
  // Unique per instance, so two cards on one page keep their own <mpath> target.
  const traceId = `aj-ecg-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "relative h-[326px] w-[262px] overflow-hidden rounded-[32px] bg-[radial-gradient(120%_120%_at_30%_20%,#2E6BD6_0%,#0C2E6E_55%,#07204f_100%)] shadow-[0_30px_60px_-28px_rgba(12,46,110,0.6)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(60% 50% at 62% 42%, rgba(52,208,88,0.42), transparent 70%)",
        }}
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <span className="absolute left-6 top-[22px] font-body text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
        {eyebrow}
      </span>

      <svg
        aria-hidden
        viewBox="0 0 200 60"
        className="absolute inset-x-6 top-[118px] h-[60px] w-[calc(100%-48px)] overflow-visible"
      >
        <path
          id={traceId}
          d="M0 30 H54 L64 10 L76 50 L88 30 H200"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle r="4.5" fill="#34D058" style={{ filter: "drop-shadow(0 0 6px rgba(52,208,88,0.95))" }}>
          <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1" keyTimes="0;1">
            <mpath href={`#${traceId}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            dur="3s"
            repeatCount="indefinite"
            values="0;1;1;1;0"
            keyTimes="0;0.07;0.5;0.93;1"
          />
        </circle>
      </svg>

      <div className="absolute bottom-6 left-6 inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.14] px-3.5 py-2.5 backdrop-blur-md">
        <Sparkles className="h-4 w-4 text-green-bright" strokeWidth={2} />
        <span className="font-body text-[13px] font-bold text-white">{badge}</span>
      </div>
    </div>
  );
}
