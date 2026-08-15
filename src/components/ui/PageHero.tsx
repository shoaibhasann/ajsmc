import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { ImageAsset } from "@/lib/assets";

/**
 * Heading size, and the matching nudge that puts the icon on the heading's first line.
 *
 * The two live together because they are one measurement: `leading-none` makes the first
 * line box exactly the font size, so an icon of 48px centres on it at (fontSize - 48) / 2.
 * Split them across the file and the next size change silently leaves the icon behind.
 *
 * `compact` exists for the specialty pages, whose titles are department names and run long.
 * At the default ceiling of 64px only 5 of the 11 fit on one line at this column width; at
 * 52px, 9 do. The remaining two ("Obstetrics and Gynaecology in Chennai", "Reproductive
 * Medicine in Chennai") wrap at any size that is still worth calling a heading.
 */
const TITLE_SCALES = {
  default: {
    text: "text-[38px] sm:text-[52px] lg:text-[clamp(38px,5vw,64px)]",
    // lg is figured against the clamp's 64px ceiling, so it is exact from 1280px up and
    // a few px generous between 1024 and 1280, where the clamp has not topped out.
    iconNudge: "mt-[-5px] sm:mt-[2px] lg:mt-[7px]",
  },
  compact: {
    text: "text-[34px] sm:text-[44px] lg:text-[52px]",
    iconNudge: "mt-[-7px] sm:mt-[-2px] lg:mt-[2px]",
  },
} as const;

export function PageHero({
  crumb,
  parent,
  badge,
  icon,
  title,
  titleScale = "default",
  tagline,
  description,
  image,
  decoration,
  decorationClassName = "",
}: {
  crumb: string;
  /** Sits between Home and `crumb`, for pages nested one level down. */
  parent?: { name: string; href: string };
  badge?: string;
  /**
   * Sits on the heading's first line, to its left. Passed in rather than built
   * here because only the caller knows which mark belongs to the page.
   */
  icon?: ReactNode;
  title: string;
  /** `compact` for pages whose titles run long — see TITLE_SCALES. */
  titleScale?: keyof typeof TITLE_SCALES;
  /** Short green line under the heading, before the longer description. */
  tagline?: string;
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
            // Above the fold and the largest thing in it, so it is the LCP element on every
            // page that uses this hero. It was loading lazily, which is the one place lazy
            // costs rather than saves. The decoration below stays lazy — it is a corner
            // illustration and nothing waits on it.
            priority
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
        <nav
          aria-label="Breadcrumb"
          className="mb-4.5 flex flex-wrap items-center gap-2 font-body text-[13px] font-semibold text-muted"
        >
          <Link href="/" className="text-muted hover:text-navy">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          {parent && (
            <>
              <Link href={parent.href} className="text-muted hover:text-navy">
                {parent.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </>
          )}
          <span className="font-bold text-navy">{crumb}</span>
        </nav>
        {badge && <SectionBadge tone="green">{badge}</SectionBadge>}

        {/*
         * The icon sits on the heading's first line rather than above it. `items-start`
         * with a nudge, not `items-center`: some of these headings wrap to two lines, and
         * centring would park the icon in the gap between them instead of beside the words.
         */}
        <div className={`flex items-start gap-3.5 sm:gap-4 ${badge ? "mt-4.5" : ""}`}>
          {icon && (
            <span aria-hidden className={`shrink-0 ${TITLE_SCALES[titleScale].iconNudge}`}>
              {icon}
            </span>
          )}
          <h1
            className={`max-w-[760px] font-heading font-extrabold leading-none tracking-tight text-navy ${TITLE_SCALES[titleScale].text}`}
          >
            {title}
          </h1>
        </div>

        {tagline && (
          <p className="mt-4 font-body text-[17px] font-semibold text-green-deep">{tagline}</p>
        )}
        <p className="mt-4.5 max-w-[560px] font-body text-base leading-relaxed text-body">
          {description}
        </p>
      </Container>
    </section>
    </div>
  );
}
