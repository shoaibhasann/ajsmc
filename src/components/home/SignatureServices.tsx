"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { AJ_EASE } from "@/lib/motion";
import { signatureServices } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SignatureServices() {
  return (
    <Container as="section" className="py-16 pt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {signatureServices.map((service, i) => {
          const asset = assets[service.asset];
          const navy = service.tone === "navy";

          return (
            <motion.a
              key={service.name}
              href="#appointment"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: AJ_EASE, delay: i * 0.1 }}
              className={cn(
                "group relative flex min-h-[250px] flex-col justify-end overflow-hidden rounded-[28px] border p-5 shadow-[0_22px_46px_-32px_rgba(12,46,110,0.5)] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                navy ? "border-navy-dark bg-navy" : "border-[#e4edf8] aj-card",
              )}
            >
              {/* Flat wash — lightest behind the copy, deepening toward the artwork. Only the
                  navy variant needs one; the light variant's wash is `aj-card`, which is now
                  the whole site's card surface and started as this gradient. */}
              {navy && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(225deg, #143A86 0%, #0C2E6E 46%, #0A2657 100%)",
                  }}
                />
              )}

              {/* Artwork and copy are kept to 46% + 52% so they can never collide. */}
              <div className="pointer-events-none absolute inset-y-0 left-[-2%] flex w-[46%] items-center justify-center">
                <Image
                  src={asset.src}
                  // Decorative here — the card heading already names the service.
                  alt=""
                  width={asset.width}
                  height={asset.height}
                  sizes="(min-width: 1024px) 180px, (min-width: 640px) 170px, 190px"
                  className={cn(
                    "h-auto w-full max-w-[190px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                    navy
                      ? "drop-shadow-[0_14px_22px_rgba(3,14,38,0.55)]"
                      : "drop-shadow-[0_14px_20px_rgba(12,46,110,0.18)]",
                  )}
                />
              </div>

              <span
                aria-hidden
                className={cn(
                  "absolute right-[18px] top-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-full shadow-[0_10px_22px_-10px_rgba(12,46,110,0.6)] transition-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                  navy ? "aj-card text-navy" : "bg-green-bright text-[#083b20]",
                )}
              >
                <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.6} />
              </span>

              <div className="relative z-[1] ml-auto max-w-[52%] text-right">
                <h3
                  className={cn(
                    "font-heading text-[19px] font-extrabold leading-[1.15]",
                    navy ? "text-white" : "text-navy",
                  )}
                >
                  {service.name}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 font-body text-[12.5px] font-medium leading-snug",
                    navy ? "text-white/75" : "text-muted",
                  )}
                >
                  {service.description}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Container>
  );
}
