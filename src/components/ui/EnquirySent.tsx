"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, MessageCircle, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { SentEnquiry } from "@/lib/useEnquiryForm";

/** How long the confirmation stays before the form comes back. */
const DISMISS_MS = 7000;

/**
 * The confirmation a patient sees after a booking form goes through.
 *
 * A dialog over the page rather than a panel inside the form card. It used to replace
 * the form in place, which meant it inherited the card's width and padding and got
 * squeezed into a narrow column — the heading broke across four lines and the copy
 * turned into a thin ribbon. Overlaying also means the form never unmounts, so coming
 * back to it is nothing more than closing this.
 *
 * Rendered through a portal on purpose: the home page's form sits inside a
 * framer-motion wrapper, and a transformed ancestor becomes the containing block for
 * fixed children — the dialog would anchor to that card instead of the viewport.
 *
 * It closes itself after a few seconds, which is what makes it feel like a
 * confirmation rather than a destination. That timer pauses the moment a pointer or
 * the keyboard goes anywhere near it, so nobody loses the message mid-read, and it is
 * cancelled outright for anyone who asked for reduced motion — an auto-dismissing
 * panel is exactly the kind of timed content that preference is often set to avoid.
 */
export function EnquirySent({ sent, onClose }: { sent: SentEnquiry | null; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  // Play the exit, then hand control back — so the form does not snap in behind it.
  const dismiss = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return onClose();
    setClosing(true);
    window.setTimeout(onClose, 200);
  };

  useEffect(() => {
    const panel = panelRef.current;
    panel?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Same trap as the mobile menu: aria-modal hides the page from a screen reader
      // but leaves it in the Tab order, so the two have to be made to agree.
      const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!panel.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    if (!reduced) {
      // Checked on a tick rather than cleared and restarted, so a pointer resting on
      // the panel simply holds it open for as long as it stays there.
      const started = Date.now();
      let elapsed = 0;
      let last = started;
      timer = window.setInterval(() => {
        const now = Date.now();
        if (!pausedRef.current) elapsed += now - last;
        last = now;
        if (elapsed >= DISMISS_MS) {
          window.clearInterval(timer);
          dismiss();
        }
      }, 120);
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      if (timer) window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // No mounted-state guard: this only ever renders after a form submission resolves on
  // the client, so it never runs during SSR. The check is here for the portal's sake.
  if (typeof document === "undefined") return null;

  const firstName = sent?.name?.split(/\s+/)[0] ?? "";

  return createPortal(
    <div
      className={`aj-dlg-wrap fixed inset-0 z-[90] flex items-center justify-center p-5 ${closing ? "is-closing" : ""}`}
    >
      <div aria-hidden className="aj-dlg-veil absolute inset-0 bg-[#07204f]/55 backdrop-blur-[3px]" onClick={dismiss} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aj-sent-title"
        tabIndex={-1}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocusCapture={() => (pausedRef.current = true)}
        className="aj-dlg relative w-full max-w-[420px] overflow-hidden rounded-[24px] bg-white p-7 text-center shadow-[0_40px_90px_-30px_rgba(7,32,79,0.6)] outline-none sm:p-8"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "radial-gradient(90% 100% at 50% 0%, rgba(52,208,88,0.16) 0%, rgba(52,208,88,0) 70%)",
          }}
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-navy"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.3} />
        </button>

        <span
          aria-hidden
          className="aj-dlg-mark relative mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full bg-green text-white shadow-[0_14px_28px_-12px_rgba(11,122,62,0.7)]"
        >
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>

        <h3
          id="aj-sent-title"
          className="relative mt-5 font-heading text-[23px] font-extrabold leading-[1.15] tracking-tight text-navy"
        >
          {firstName ? `Thank you, ${firstName}` : "Thank you"}
        </h3>

        <p className="relative mt-2.5 font-body text-[14.5px] leading-relaxed text-body">
          {sent?.department ? (
            <>
              Your enquiry for <strong className="text-navy">{sent.department}</strong> is with us.
              {sent.phone ? <> We will call you on {sent.phone}</> : null} during clinic hours,{" "}
              {siteConfig.hoursShort}.
            </>
          ) : (
            <>We have your enquiry and will call you during clinic hours, {siteConfig.hoursShort}.</>
          )}
        </p>

        <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-body text-[14.5px] font-bold text-white transition-opacity hover:opacity-90"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy/15 px-5 py-2.5 font-body text-[14.5px] font-bold text-navy transition-colors hover:bg-surface"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
