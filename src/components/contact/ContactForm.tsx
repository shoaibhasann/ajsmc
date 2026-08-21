"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";
import { departments, siteConfig } from "@/lib/site";
import { HONEYPOT_FIELD } from "@/lib/enquiry";
import { useEnquiryForm } from "@/lib/useEnquiryForm";
import { EnquirySent } from "@/components/ui/EnquirySent";
import { SectionBadge } from "@/components/ui/SectionBadge";

export function ContactForm() {
  const { status, error, sent: submitted, handleSubmit, reset } = useEnquiryForm("contact");
  const sent = status === "sent";
  const sending = status === "sending";


  return (
    <div className="rounded-[26px] border aj-card p-8 shadow-[0_30px_60px_-40px_rgba(12,46,110,0.5)] sm:p-9">
      <SectionBadge tone="green">SEND US A MESSAGE</SectionBadge>
      <h2 className="mb-1.5 mt-4 font-heading text-2xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[30px] lg:text-[clamp(24px,3vw,34px)]">
        Book a visit or ask a question
      </h2>
      <p className="mb-6 max-w-[460px] font-body text-sm leading-relaxed text-muted">
        Fill in your details and our team will get back to you shortly. Affordable specialist
        care, no heavy charges.
      </p>

      {sent && <EnquirySent sent={submitted} onClose={reset} />}

      <form onSubmit={handleSubmit} className="relative">
          {/* Honeypot. aria-hidden and off-screen rather than display:none, because some
              bots skip fields that are not rendered at all. A person never reaches it. */}
          <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Full Name</span>
              <input type="text" name="name" required disabled={sending} placeholder="Your name" className="aj-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Phone Number</span>
              <input type="tel" name="phone" required disabled={sending} placeholder="+91" className="aj-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Email</span>
              <input type="email" name="email" disabled={sending} placeholder="you@example.com" className="aj-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Department</span>
              <select name="department" required disabled={sending} defaultValue="" className="aj-input">
                <option value="" disabled>
                  Select a department
                </option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-4 block">
            <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Message</span>
            <textarea rows={4} name="message" disabled={sending} placeholder="How can we help?" className="aj-input resize-y" />
          </label>
          <div className="mt-5.5 flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={sending}
              className="aj-cta-wave inline-flex items-center gap-2.5 rounded-full bg-navy py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-white shadow-[0_16px_30px_-16px_rgba(12,46,110,0.7)] disabled:opacity-70"
            >
              <span>{sending ? "Sending…" : "Send Message"}</span>
              <span className="aj-cta-dot flex h-[38px] w-[38px] items-center justify-center rounded-full bg-green-bright text-[#083b20]">
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.6} />
                ) : (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
                )}
              </span>
            </button>
            <span className="font-body text-sm font-medium text-muted">
              or call{" "}
              <a href={siteConfig.phoneHref} className="font-bold text-navy">
                {siteConfig.phone}
              </a>
            </span>
          </div>
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-2xl border border-[#a02929]/25 bg-[#a02929]/[0.06] px-4 py-3 font-body text-sm font-medium text-[#a02929]"
            >
              {error} Please call{" "}
              <a href={siteConfig.phoneHref} className="font-bold underline">
                {siteConfig.phone}
              </a>{" "}
              and we will take your booking directly.
            </p>
          )}
      </form>
    </div>
  );
}
