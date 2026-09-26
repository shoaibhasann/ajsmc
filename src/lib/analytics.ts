import { track } from "@vercel/analytics";

/**
 * One call for every conversion event on the site.
 *
 * Google Analytics 4 is the destination that is live. It is loaded by <GoogleAnalytics />
 * in the root layout, production builds only, and that component defines `window.gtag`.
 * When it is absent — `next dev`, a blocked script, an ad blocker — this does nothing
 * rather than throwing or filling the console, because counting a tap is never worth
 * breaking the link a patient is trying to use.
 *
 * Vercel's `track` is called as well. It is a no-op while Web Analytics is switched off
 * for the project (see the note in the root layout), and it means turning that back on
 * later needs no change here.
 *
 * NEVER put the patient's name, phone number, email or message in `params`. Google's
 * Analytics terms forbid sending anything that identifies a person, and on a site whose
 * chairman practises sexual and reproductive medicine the stakes of getting that wrong
 * are not only contractual. The department chosen on a form is recorded; who chose it
 * is not.
 */
type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
  } catch {
    // Counting is not worth breaking anything over.
  }
  try {
    track(name, params);
  } catch {
    // Same.
  }
}
