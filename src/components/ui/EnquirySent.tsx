"use client";

import { Check, Clock, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import type { SentEnquiry } from "@/lib/useEnquiryForm";

/**
 * What a patient sees after a booking form goes through.
 *
 * Shared by both forms so the moment that matters most reads identically wherever
 * they submitted from. The old version was a one-line green strip saying "Your
 * message has been received" — which was worse than terse, because at the time it
 * was also untrue.
 *
 * Three things it has to do, in this order:
 *
 *  1. Prove the submission registered. It says the patient's own name and the
 *     department back to them; a generic tick leaves people wondering whether the
 *     right thing went through, and a wrong department here is something they can
 *     catch immediately rather than at the counter.
 *  2. Set an honest expectation. It does NOT promise a call "shortly" — the clinic
 *     is open Mon to Sat, 10am to 9pm, and a form filled at midnight will not be
 *     answered at midnight. Saying so is kinder than a promise that breaks.
 *  3. Leave a way through for anything urgent, because a patient who needs an
 *     answer now must not be left holding a confirmation screen.
 */
export function EnquirySent({ sent, onReset }: { sent: SentEnquiry | null; onReset: () => void }) {
  const firstName = sent?.name?.split(/\s+/)[0] ?? "";

  return (
    <div
      // Announced rather than silently swapped in: a screen-reader user who submits
      // needs to hear that it worked, not discover it by exploring.
      role="status"
      aria-live="polite"
      className="aj-sent relative overflow-hidden rounded-[26px] border border-green/25 p-8 sm:p-9"
      style={{
        background:
          "radial-gradient(120% 140% at 8% 0%, rgba(52,208,88,0.16) 0%, rgba(52,208,88,0) 52%), linear-gradient(210deg, #ffffff 0%, #f6fbf8 46%, #eef6f1 100%)",
      }}
    >
      <span
        aria-hidden
        className="aj-sent-mark flex h-[62px] w-[62px] items-center justify-center rounded-full bg-green text-white shadow-[0_16px_30px_-14px_rgba(11,122,62,0.65)]"
      >
        <Check className="h-[30px] w-[30px]" strokeWidth={3} />
      </span>

      <h3 className="mt-6 font-heading text-[26px] font-extrabold leading-[1.12] tracking-tight text-navy sm:text-[30px]">
        {firstName ? `Thank you, ${firstName}.` : "Thank you."}
        <br />
        Your request is with us.
      </h3>

      {sent?.department && (
        <p className="mt-3.5 font-body text-[15px] leading-relaxed text-body">
          We have your enquiry for <strong className="text-navy">{sent.department}</strong>
          {sent.phone ? (
            <>
              {" "}and will call you on <strong className="text-navy">{sent.phone}</strong>
            </>
          ) : null}
          .
        </p>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-navy/[0.09] bg-white/70 px-5 py-4">
        <Clock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-green-deep" strokeWidth={2.3} />
        <p className="font-body text-sm leading-relaxed text-body">
          Our team calls back during clinic hours, {siteConfig.hoursShort}. If you have written to
          us outside those hours, you will hear from us when we next open.
        </p>
      </div>

      <p className="mt-6 font-body text-sm font-semibold text-navy">
        If it cannot wait, reach us now
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
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
          className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 font-body text-[14.5px] font-bold text-navy transition-colors hover:bg-surface"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.4} />
          WhatsApp
        </a>
      </div>

      {/* Negative margin keeps it looking like a plain text link while the padding
          gives it a 44px touch target — measured at 20px before, which is under every
          platform's minimum and awkward on a phone. */}
      <button
        type="button"
        onClick={onReset}
        className="-mx-2 mt-5 inline-flex min-h-[44px] items-center px-2 font-body text-sm font-semibold text-green-deep underline underline-offset-4 transition-opacity hover:opacity-75"
      >
        Send another enquiry
      </button>
    </div>
  );
}
