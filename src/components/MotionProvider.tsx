"use client";

import { MotionConfig } from "framer-motion";

/**
 * `reducedMotion="user"` makes every motion component in the tree skip transform
 * and layout animations when the OS asks for reduced motion, while still allowing
 * opacity to fade. One provider covers the whole app, so individual components do
 * not each need a `useReducedMotion()` branch.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
