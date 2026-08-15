"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { departments, siteConfig } from "@/lib/site";
import { SectionBadge } from "@/components/ui/SectionBadge";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

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

      {sent ? (
        <div className="flex items-center gap-3.5 rounded-2xl border border-green/30 bg-soft-green px-6 py-5.5">
          <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-green text-lg text-white">
            ✓
          </span>
          <div>
            <div className="font-heading text-[17px] font-bold text-navy">Thank you!</div>
            <div className="font-body text-sm font-medium text-body">
              Your message has been received. We&apos;ll call you back soon.
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Full Name</span>
              <input type="text" required placeholder="Your name" className="aj-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Phone Number</span>
              <input type="tel" required placeholder="+91" className="aj-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Email</span>
              <input type="email" required placeholder="you@example.com" className="aj-input" />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-body text-xs font-semibold text-ink">Department</span>
              <select required defaultValue="" className="aj-input">
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
            <textarea rows={4} placeholder="How can we help?" className="aj-input resize-y" />
          </label>
          <div className="mt-5.5 flex flex-wrap items-center gap-5">
            <button
              type="submit"
              className="aj-cta-wave inline-flex items-center gap-2.5 rounded-full bg-navy py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-white shadow-[0_16px_30px_-16px_rgba(12,46,110,0.7)]"
            >
              <span>Send Message</span>
              <span className="aj-cta-dot flex h-[38px] w-[38px] items-center justify-center rounded-full bg-green-bright text-[#083b20]">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
              </span>
            </button>
            <span className="font-body text-sm font-medium text-muted">
              or call{" "}
              <a href={siteConfig.phoneHref} className="font-bold text-navy">
                {siteConfig.phone}
              </a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
