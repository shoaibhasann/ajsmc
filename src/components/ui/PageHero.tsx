import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { ImageAsset } from "@/lib/assets";

export function PageHero({
  crumb,
  badge,
  title,
  description,
  image,
  decoration,
  decorationClassName = "",
}: {
  crumb: string;
  badge: string;
  title: string;
  description: string;
  /** Optional background artwork; a light scrim keeps the navy text readable over it. */
  image?: ImageAsset;
  /** Optional cut-out illustration anchored to the bottom-right corner. */
  decoration?: ImageAsset;
  /** Extra classes for the decoration (e.g. a rotation) that vary per page. */
  decorationClassName?: string;
}) {
  return (
    <div className="px-3 pt-3 sm:px-4 sm:pt-4">
    <section
      className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]"
      style={{
        background:
          "radial-gradient(85% 120% at 88% 12%, rgba(23,196,107,0.20) 0%, rgba(23,196,107,0) 55%), linear-gradient(160deg, #E7F1FC 0%, #F4F9FD 60%, #E8F6EF 100%)",
      }}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none select-none object-cover object-[60%_center]"
          />
          {/* Light scrim — just enough to keep the navy heading and muted copy readable;
              kept low so the artwork reads as a real background, not a white wash. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(244,249,253,0.6) 0%, rgba(244,249,253,0.36) 42%, rgba(240,249,246,0.12) 74%, rgba(233,246,240,0) 100%)",
            }}
          />
        </>
      )}

      {decoration && (
        <Image
          src={decoration.src}
          // Decorative — the heading already conveys the section.
          alt=""
          width={decoration.width}
          height={decoration.height}
          sizes="(min-width: 1024px) 320px, 220px"
          // Negative bottom offsets the image's transparent lower padding so the
          // bottle grounds right at the section's bottom edge (clipped by overflow).
          className={`pointer-events-none absolute -bottom-5 right-3 hidden h-auto w-[210px] select-none drop-shadow-[0_18px_30px_rgba(12,46,110,0.28)] sm:block lg:-bottom-7 lg:right-10 lg:w-[310px] ${decorationClassName}`.trim()}
        />
      )}

      {/* pt clears the fixed navbar pill floating inside this card's top edge. */}
      <Container className="relative pb-[60px] pt-[104px] lg:pt-[116px]">
        <div className="mb-4.5 flex items-center gap-2 font-body text-[13px] font-semibold text-muted">
          <Link href="/" className="text-muted hover:text-navy">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          <span className="font-bold text-navy">{crumb}</span>
        </div>
        <SectionBadge tone="green">{badge}</SectionBadge>
        <h1 className="mt-4.5 max-w-[760px] font-heading text-[38px] font-extrabold leading-none tracking-tight text-navy sm:text-[52px] lg:text-[clamp(38px,5vw,64px)]">
          {title}
        </h1>
        <p className="mt-4.5 max-w-[560px] font-body text-base leading-relaxed text-body">
          {description}
        </p>
      </Container>
    </section>
    </div>
  );
}
