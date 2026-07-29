"use client";

import { useEffect, useState } from "react";

/**
 * True on viewports below `lg`, where the multi-column grids collapse to a single
 * column. Entrance animations use it to swap their sideways slide for a short
 * fade-up: at these widths the Container gutter is only 20px, so a 48-56px slide
 * hangs past the viewport edge and the browser flickers a horizontal scrollbar in
 * and out for the length of the animation.
 *
 * Starts `false` so the server render and the first client render agree; the
 * reveals that read it are scroll-triggered and fire long after mount.
 */
export function useIsCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return compact;
}
