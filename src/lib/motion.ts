/**
 * Shared entrance timing for the hero + navbar, kept in one place so the three
 * elements always read as a single staggered sequence.
 *
 * Cubic-out rather than expo-out: expo (`[0.16, 1, 0.3, 1]`) covers ~80% of the
 * distance in the first quarter of its duration, so the travel reads as a snap no
 * matter how long the duration is. Cubic spreads the movement out enough to
 * actually be seen, while still settling softly.
 */
export const AJ_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

/** Left copy, then the artwork column, then the navbar drops in last. */
export const heroTransition = {
  leftColumn: { duration: 1.1, delay: 0.15, ease: AJ_EASE },
  rightColumn: { duration: 1.1, delay: 0.4, ease: AJ_EASE },
  navbar: { duration: 0.9, delay: 0.7, ease: AJ_EASE },
} as const;

/**
 * Standard scroll-into-view reveal for section content — same cubic-out feel as
 * the hero so the whole site animates as one language. Pass an index to stagger a
 * row/grid of items, and an axis to slide from a side ("up" is the default).
 *
 *   <motion.div {...reveal(i, "left")} />
 */
export function reveal(index = 0, from: "up" | "left" | "right" = "up") {
  const offset =
    from === "left" ? { x: -48 } : from === "right" ? { x: 48 } : { y: 28 };
  return {
    initial: { opacity: 0, ...offset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-80px" as const },
    transition: { duration: 0.7, ease: AJ_EASE, delay: Math.min(index, 6) * 0.08 },
  };
}
