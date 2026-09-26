"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Counts taps on the three ways a patient contacts the hospital without the form:
 * phone, WhatsApp, and the map.
 *
 * One listener on the document rather than an onClick on each link. The phone number
 * alone is rendered by thirteen different components — header, footer, contact card,
 * article foot, department pages, the confirmation dialog — and a handler bolted onto
 * each would be thirteen places for the next new link to be forgotten. This catches every
 * current link and every future one by what the link points at, not by where it lives.
 *
 * Capture phase, so a component that stops propagation on its own click cannot hide the
 * tap from the count.
 *
 * `cta_location` answers the question the raw count cannot: which placement did the
 * work. It is taken from the nearest `data-cta` attribute where a link sets one (the
 * WhatsApp placements do), otherwise from the landmark or section the link sits in. The
 * page itself is already on every event as GA's own page_location, so it is not repeated.
 *
 * Not counted, and cannot be: a tap on the embedded map on /contact. That map is an
 * iframe on google.com, and a page cannot see clicks inside another origin's frame. The
 * "Get Directions" link beside it is counted.
 */
const MAPS = /(maps\.google\.|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|share\.google)/i;
const WHATSAPP = /(wa\.me|api\.whatsapp\.com|^whatsapp:)/i;

function kindOf(href: string): "phone_click" | "whatsapp_click" | "map_click" | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (WHATSAPP.test(href)) return "whatsapp_click";
  if (MAPS.test(href)) return "map_click";
  return null;
}

function locate(el: Element): string {
  const tagged = el.closest("[data-cta]")?.getAttribute("data-cta");
  if (tagged) return tagged;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  if (el.closest('[role="dialog"]')) return "dialog";
  if (el.closest("aside")) return "aside";
  const section = el.closest("section[id], div[id]")?.id;
  if (section) return `section:${section}`;
  return "body";
}

export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const kind = kindOf(href);
      if (!kind) return;

      trackEvent(kind, {
        cta_location: locate(link),
        link_text: (link.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 60) || "(icon)",
        // The hospital's own line, not the visitor's — which of the three published
        // numbers people actually ring is worth knowing.
        ...(kind === "phone_click" ? { phone_line: href.slice(4) } : {}),
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
