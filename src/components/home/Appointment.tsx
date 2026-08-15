"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { assets } from "@/lib/assets";
import { AJ_EASE } from "@/lib/motion";
import { departments, siteConfig } from "@/lib/site";
import { useIsCompact } from "@/lib/useIsCompact";

export function Appointment() {
  const [sent, setSent] = useState(false);
  const compact = useIsCompact();

  /*
   * KNOWN, AND DELIBERATE FOR NOW: this sends nothing anywhere. No fetch, no form action,
   * no API route, and the inputs carry no name and no state binding, so what a patient
   * types is never read. The confirmation shown afterwards says the request was received.
   *
   * This is the site's main booking path, and it is the same stub as in
   * contact/ContactForm.tsx — see the fuller note there. Flagged and left at the client's
   * instruction; fix both together.
   */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Container as="section" id="appointment" className="py-16 pb-[76px] pt-8">
      <div className="grid grid-cols-1 items-stretch gap-6.5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          initial={compact ? { opacity: 0, y: 24 } : { opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: AJ_EASE }}
          className="relative overflow-hidden rounded-[26px] bg-navy-dark p-8 text-white sm:p-9"
        >
          <Image
            src={assets.reachBg.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          {/* Light navy wash — darker on the left where the text sits, fading right so
              the swirl still shows. Text-shadow on the content does the rest. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#07204f]/88 via-[#0a2657]/68 to-[#0c2e6e]/46"
          />
          {/* text-shadow inherits to all copy below, so it stays legible on the
              brighter parts of the swirl without a heavy overlay. */}
          <div className="relative [text-shadow:0_1px_10px_rgba(7,32,79,0.9)]">
          <h3 className="mb-5.5 font-heading text-[22px] font-extrabold text-white">Reach Us</h3>
          <div className="flex flex-col gap-5">
            <InfoRow icon={MapPin} title="Visit Us" value={siteConfig.address.full} href={siteConfig.mapsHref} />
            <InfoRow icon={Phone} title="Call Us" value={`${siteConfig.phone} · ${siteConfig.mobile}`} href={siteConfig.phoneHref} />
            <InfoRow icon={Mail} title="Email Us" value={siteConfig.email} href={siteConfig.emailHref} />
          </div>
          <div className="mt-6.5 flex items-center gap-3 rounded-2xl border border-green-bright/30 bg-[#0a2657]/40 px-[18px] py-4 backdrop-blur-[2px]">
            <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-green-bright shadow-[0_0_0_4px_rgba(52,208,88,0.25)]" />
            <span className="font-body text-[13px] font-semibold leading-snug text-white">
              Consultations Mon to Sat, 10am to 9pm &middot;{" "}
              <span className="text-green-bright">helpline open 24 hours</span>
            </span>
          </div>
          </div>
        </motion.div>

        <motion.div
          initial={compact ? { opacity: 0, y: 24 } : { opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: AJ_EASE, delay: 0.12 }}
          className="rounded-[26px] border aj-card p-8 shadow-[0_30px_60px_-40px_rgba(12,46,110,0.5)] sm:p-9"
        >
          <SectionBadge tone="green">BOOK A VISIT</SectionBadge>
          <h2 className="mb-1.5 mt-4 font-heading text-[26px] font-extrabold leading-[1.06] tracking-tight text-navy sm:text-[32px] lg:text-[clamp(26px,3vw,38px)]">
            Request an Appointment
          </h2>
          <p className="mb-6.5 max-w-[460px] font-body text-[15px] leading-relaxed text-muted">
            Tell us the department and a time that suits you. Our team will call back to
            confirm the slot, and you will know the consultation fee before you arrive.
          </p>

          {sent ? (
            <div className="flex items-center gap-3.5 rounded-2xl border border-green/30 bg-soft-green px-6 py-5.5">
              <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-green text-white">
                ✓
              </span>
              <div>
                <div className="font-heading text-[17px] font-bold text-navy">Thank you!</div>
                <div className="font-body text-sm font-medium text-body">
                  Your request has been received. We&apos;ll call you back soon.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name">
                  <input type="text" required placeholder="Your name" className="aj-input" />
                </Field>
                <Field label="Phone Number">
                  <input type="tel" required placeholder="+91" className="aj-input" />
                </Field>
                <Field label="Department">
                  <select required className="aj-input" defaultValue="">
                    <option value="" disabled>
                      Select a department
                    </option>
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred Date">
                  <input type="date" required className="aj-input" />
                </Field>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  className="aj-cta-wave inline-flex items-center gap-2.5 rounded-full bg-navy py-[9px] pl-6 pr-[9px] font-body text-[15px] font-bold text-white shadow-[0_16px_30px_-16px_rgba(12,46,110,0.7)]"
                >
                  <span>Request Appointment</span>
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
        </motion.div>
      </div>
    </Container>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-body text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

function InfoRow({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof MapPin;
  title: string;
  value: string;
  href?: string;
}) {
  const external = href?.startsWith("http");
  return (
    <div className="flex gap-3.5">
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-white/10 text-green-bright">
        <Icon className="h-[19px] w-[19px]" strokeWidth={2} />
      </span>
      <div>
        <span className="mb-0.5 block font-body text-sm font-bold text-white">{title}</span>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="font-body text-[13px] font-semibold leading-snug text-white transition-colors hover:text-green-bright"
          >
            {value}
          </a>
        ) : (
          <span className="font-body text-[13px] font-semibold leading-snug text-white">{value}</span>
        )}
      </div>
    </div>
  );
}
