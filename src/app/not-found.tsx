import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

/**
 * Custom 404 — without this, Next.js ships its bare default error component,
 * which ignores the site's theme and offers the lost visitor nothing to do.
 * The header and footer still render around it, so this only fills the middle:
 * say plainly the page does not exist, then offer the three exits a patient
 * actually wants — home, the doctors list, and the phone.
 */
export default function NotFound() {
  return (
    <Container as="section" className="pb-24 pt-[164px] text-center">
      <p className="font-heading text-[64px] font-extrabold leading-none tracking-tight text-navy/15 sm:text-[88px]">
        404
      </p>
      <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mx-auto mt-4 max-w-[520px] font-body text-[15px] leading-relaxed text-muted">
        The link may be old or mistyped. Everything on the site is reachable from the home
        page — or call {siteConfig.phone} and our team will point you the right way.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <Link
          href="/"
          className="aj-cta-wave inline-flex items-center gap-2.5 rounded-full bg-navy py-2.5 pl-[24px] pr-2.5 font-body text-[15px] font-bold text-white shadow-[0_12px_26px_-14px_rgba(12,46,110,0.5)]"
        >
          <span>Back to home</span>
          <span className="aj-cta-dot flex h-9 w-9 items-center justify-center rounded-full bg-green-bright text-[#083b20]">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
          </span>
        </Link>
        <Link
          href="/doctors"
          className="inline-flex items-center rounded-full border border-navy/15 bg-white/70 px-6 py-3 font-body text-[15px] font-bold text-navy"
        >
          Find a doctor
        </Link>
      </div>
    </Container>
  );
}
