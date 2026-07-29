"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { assets, type AssetKey } from "@/lib/assets";
import { AJ_EASE } from "@/lib/motion";
import { useIsCompact } from "@/lib/useIsCompact";

// One big feature tile (Reception) + eight equal tiles. In a 4-column grid the
// feature is 2x2 and the other eight are 1x1, so it tiles to an exact 4x3 block
// with no ragged edges. In the 2-column layout the feature is a full-width 2x2
// and the eight tiles stack in four clean rows.
// `from` matches each tile's half of the desktop grid: the left columns slide in
// from the left, the right columns from the right (see the placement comment above).
const tiles: { name: string; asset: AssetKey; feature?: boolean; from: "left" | "right" }[] = [
  { name: "Reception & Lobby", asset: "reception", feature: true, from: "left" },
  { name: "Consultation Room", asset: "consultRoom", from: "right" },
  { name: "Private Room", asset: "privateRoom1", from: "right" },
  { name: "TMT / Stress Test", asset: "tmtRoom", from: "right" },
  { name: "Private Ward", asset: "privateRoom2", from: "right" },
  { name: "X-Ray Room", asset: "xrayRoom", from: "left" },
  { name: "OPD Consultation Area", asset: "opdArea", from: "left" },
  { name: "USG & ECG Room", asset: "usgEcgRoom", from: "right" },
  { name: "Cardiology Lab", asset: "cardiologyLab", from: "right" },
];

export function FacilitiesGallery() {
  const compact = useIsCompact();

  return (
    <Container as="section" id="facilities" className="py-16 pt-8">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionBadge tone="blue">OUR FACILITIES</SectionBadge>
          <h2 className="mt-4.5 font-heading text-[30px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[38px] lg:text-[clamp(30px,3.6vw,46px)]">
            Inside AJSMC
          </h2>
        </div>
        <p className="max-w-[360px] font-body text-[15px] leading-relaxed text-muted">
          Consultation rooms, private wards, X-ray, ultrasound and cardiac testing, all in
          the same building on Police Commissioner Office Road.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 [grid-auto-rows:150px] sm:[grid-auto-rows:175px] lg:grid-cols-4 lg:[grid-auto-rows:190px]">
        {tiles.map((tile, i) => {
          const asset = assets[tile.asset];
          return (
            <motion.div
              key={tile.asset}
              // `from` only means anything once the tiles sit in four columns; in the
              // 2-column phone layout both halves would swing across the full width.
              initial={
                compact
                  ? { opacity: 0, y: 20 }
                  : { opacity: 0, x: tile.from === "left" ? -56 : 56 }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: AJ_EASE, delay: Math.min(i, 6) * 0.07 }}
              className={`group relative overflow-hidden rounded-[20px] bg-tile-blue shadow-[0_20px_40px_-30px_rgba(12,46,110,0.6)] ${
                tile.feature ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                fill
                sizes={
                  tile.feature
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, 50vw"
                }
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07204f]/0 via-transparent to-[#07204f]/75" />
              <span className="pointer-events-none absolute inset-x-[18px] bottom-4 font-heading text-[15px] font-bold text-white sm:text-base">
                {tile.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
