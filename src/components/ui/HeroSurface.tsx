import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { ImageAsset } from "@/lib/assets";

/**
 * The rounded card every page hero sits on: the brand gradient, the optional background
 * artwork with its scrims, and the optional corner illustration.
 *
 * Pulled out of PageHero because the doctor profile pages need the same backdrop but a
 * completely different layout inside it — a portrait beside a name, not a stacked heading.
 * Before this they drew the gradient themselves, which was the third hand-written copy of
 * it, and they got none of the artwork the rest of the site's heroes have.
 */
export function HeroSurface({
  image,
  decoration,
  decorationClassName = "",
  scrim = "copy-left",
  children,
}: {
  /** Background artwork; a scrim keeps the navy text readable over it. */
  image?: ImageAsset;
  /**
   * Which scrim the layout inside needs, because direction depends on where the text is.
   *
   * `copy-left` is for the stacked heroes: copy in the left half of a wide box, artwork's
   * busy half to the right, so the scrim fades left to right and lightens only what is
   * under text.
   *
   * `copy-wide` is for layouts whose text runs most of the way across — the doctor profiles
   * put a portrait on the left and every word to its right, out to about 74% of the box.
   * `copy-left` has faded to nothing by then, and `even` covers the text but flattens the
   * artwork everywhere, which made these heroes look like a different site from the listing
   * they are reached from. This one holds its cover across the text and then drops to zero
   * over the last quarter, so the corner the artwork and the illustration actually live in
   * stays vivid.
   *
   * The values are the lightest that still clear 4.5:1. Measured at 1440 on a profile, the
   * binding element is the 14.5px address line at 4.76:1 — not the green tagline, which
   * stopped being the constraint once it went to 19px bold. The right-hand strip holds a
   * mean luminance of 0.66 against the listing's 0.61; `even` washed it to 0.87, which is
   * what made these heroes look like a different site. Lighter than this and the address
   * fails, so do not open it up further without re-measuring.
   *
   * `even` is the flat, strong one. It is what phones get at every breakpoint, since a
   * narrow box has no left half to speak of.
   */
  scrim?: "copy-left" | "copy-wide" | "even";
  /** Cut-out illustration anchored to the bottom-right corner. */
  decoration?: ImageAsset;
  /**
   * Extra classes for the decoration — genuine per-page effects only, like the rotation on
   * the Doctors listing. Size and vertical offset belong to the asset now, not here.
   */
  decorationClassName?: string;
  children: ReactNode;
}) {
  // Falls back to the shared grounding for any illustration that has not been measured yet.
  const place = decoration?.placement ?? { width: 210, widthLg: 310, bottom: -20, bottomLg: -28 };

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
            {/*
             * Two scrims, because one direction cannot serve both layouts.
             *
             * On desktop the copy occupies the left of a wide box and the artwork's busy half
             * sits to the right, so a scrim that fades left-to-right lightens exactly what is
             * under text and leaves the rest alone.
             *
             * On a phone the box is narrow and tall and the text runs its full width, so that
             * same fade leaves the end of every line sitting on unscrimmed artwork. Measured
             * at 375px: body copy fell to 3.39:1 and the breadcrumb to 4.07:1 against a 4.5
             * requirement. A flatter, stronger vertical scrim puts them at 5.32 and 4.72.
             *
             * The even scrim is at 0.88/0.82 rather than the 0.80/0.72 it started at. The
             * binding element is the 17px green tagline, the smallest coloured text on any
             * hero: it sat at 4.27:1, and this is the point where it clears 4.5. Raising the
             * scrim was chosen over darkening --color-green-deep again, which passes
             * everywhere else with margin and would have been changed site-wide to win 0.2
             * here. The artwork is texture rather than content, so it can afford the wash.
             */}
            <div
              aria-hidden
              className={scrim === "even" ? "absolute inset-0" : "absolute inset-0 lg:hidden"}
              style={{
                background:
                  "linear-gradient(180deg, rgba(244,249,253,0.88) 0%, rgba(240,249,246,0.82) 100%)",
              }}
            />
            {scrim !== "even" && (
              <div
                aria-hidden
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    scrim === "copy-wide"
                      ? "linear-gradient(100deg, rgba(244,249,253,0.66) 0%, rgba(244,249,253,0.58) 50%, rgba(240,249,246,0.44) 78%, rgba(233,246,240,0) 100%)"
                      : "linear-gradient(100deg, rgba(244,249,253,0.6) 0%, rgba(244,249,253,0.36) 42%, rgba(240,249,246,0.12) 74%, rgba(233,246,240,0) 100%)",
                }}
              />
            )}
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
            // Size and vertical offset come from the asset, because both depend on how much
            // transparent margin the artwork was drawn with — see `placement` in assets.ts.
            // Passed as custom properties so one class list can serve every illustration.
            style={
              {
                "--aj-decor-w": `${place.width}px`,
                "--aj-decor-w-lg": `${place.widthLg}px`,
                "--aj-decor-b": `${place.bottom}px`,
                "--aj-decor-b-lg": `${place.bottomLg}px`,
              } as CSSProperties
            }
            className={`pointer-events-none absolute bottom-[var(--aj-decor-b)] right-3 hidden h-auto w-[var(--aj-decor-w)] select-none drop-shadow-[0_18px_30px_rgba(12,46,110,0.28)] sm:block lg:bottom-[var(--aj-decor-b-lg)] lg:right-10 lg:w-[var(--aj-decor-w-lg)] ${decorationClassName}`.trim()}
          />
        )}

        {children}
      </section>
    </div>
  );
}
