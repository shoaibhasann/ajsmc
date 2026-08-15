import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { HeroSurface } from "@/components/ui/HeroSurface";
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
  scrim,
  children,
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
  /** Optional — a page whose `children` already carry the intro should not repeat it. */
  description?: string;
  /** Optional background artwork; a light scrim keeps the navy text readable over it. */
  image?: ImageAsset;
  /** Optional cut-out illustration anchored to the bottom-right corner. */
  decoration?: ImageAsset;
  /** Extra classes for the decoration (e.g. a rotation) that vary per page. */
  decorationClassName?: string;
  /** Forwarded to HeroSurface — see the note there on why direction matters. */
  scrim?: "copy-left" | "even";
  /** Rendered inside the hero, below the description. */
  children?: ReactNode;
}) {
  return (
    <HeroSurface
      image={image}
      decoration={decoration}
      decorationClassName={decorationClassName}
      scrim={scrim}
    >
      {/* pt clears the fixed navbar pill floating inside this card's top edge. */}
      <Container className="relative pb-[60px] pt-[104px] lg:pt-[116px]">
        {/* text-body, not text-muted: this sits on hero artwork, where muted measured
            4.31:1 against the 4.5:1 it needs. Same string on a plain background was already
            marginal. */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4.5 flex flex-wrap items-center gap-2 font-body text-[13px] font-semibold text-body"
        >
          <Link href="/" className="text-body hover:text-navy">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          {parent && (
            <>
              <Link href={parent.href} className="text-body hover:text-navy">
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
         *
         * Desktop only, from lg up. It costs about 62px of the heading's line, and the
         * heading is the part carrying the information — the icon only decorates it. At
         * 768px that 62px is the difference between "Orthopedics in Chennai" sitting on
         * one line and wrapping to two; at 375px the heading wraps either way, so there
         * it simply takes width from a line that has none to spare.
         *
         * The per-breakpoint nudges below stay correct for the sizes they name, so showing
         * this lower down again is a one-word change rather than a re-measurement.
         */}
        <div className={`flex items-start gap-3.5 sm:gap-4 ${badge ? "mt-4.5" : ""}`}>
          {icon && (
            <span
              aria-hidden
              className={`hidden shrink-0 lg:block ${TITLE_SCALES[titleScale].iconNudge}`}
            >
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
        {description && (
          <p className="mt-4.5 max-w-[560px] font-body text-base leading-relaxed text-body">
            {description}
          </p>
        )}
        {children}
      </Container>
    </HeroSurface>
  );
}
