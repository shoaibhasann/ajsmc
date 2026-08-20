"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Clock, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { heroTransition } from "@/lib/motion";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll and wire Escape only while the drawer is open.
  // (Nav links close the drawer themselves on click, so no route-change effect is needed.)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => href === pathname || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* Fixed, not sticky: the pill has to float *over* the hero card rather than
          reserve a row above it, so it takes no space in the document flow.
          Safe to transform because the mobile drawer lives outside this element —
          a transformed ancestor would otherwise become its containing block. */}
      <motion.header
        initial={{ y: -88, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={heroTransition.navbar}
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
      >
        <Container>
          <div className="flex items-center justify-between gap-6 rounded-full border border-white/60 bg-white/95 py-2 pl-5 pr-2 shadow-[0_18px_40px_-22px_rgba(12,46,110,0.55)] backdrop-blur-md lg:pl-6">
            <Logo />

            <nav className="hidden items-center gap-8 font-body text-[15px] font-semibold text-[#3A4A63] lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 transition-colors hover:text-navy ${
                    isActive(link.href) ? "text-navy" : ""
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-[7px] left-0 right-0 h-0.5 rounded-sm bg-green" />
                  )}
                </Link>
              ))}
            </nav>

            <Link
              href="/#appointment"
              className="aj-cta-wave hidden items-center gap-2.5 rounded-full bg-navy py-2 pl-[22px] pr-2 font-body text-[15px] font-bold text-white shadow-[0_12px_26px_-14px_rgba(12,46,110,0.5)] lg:inline-flex"
            >
              <span>Book Appointment</span>
              <span className="aj-cta-dot flex h-9 w-9 items-center justify-center rounded-full bg-green-bright text-[#083b20]">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.6} />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full border aj-card text-navy transition-colors hover:border-navy/25 lg:hidden"
            >
              <Menu className="h-[22px] w-[22px]" strokeWidth={2.2} />
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Drawer lives OUTSIDE <header>: the header's backdrop-filter would otherwise
          become the containing block for these fixed children, anchoring them to the
          header box instead of the viewport. */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-[#07204f]/60 backdrop-blur-[3px]"
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed inset-y-0 right-0 z-[81] flex w-[86vw] max-w-[380px] flex-col aj-card shadow-[-24px_0_60px_-20px_rgba(7,32,79,0.45)]"
            >
              {/* brand wash — keeps the panel from reading as a flat white sheet */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-64"
                style={{
                  background:
                    "radial-gradient(120% 90% at 100% 0%, rgba(23,196,107,0.10) 0%, rgba(23,196,107,0) 60%), linear-gradient(180deg, rgba(12,46,110,0.05) 0%, rgba(12,46,110,0) 100%)",
                }}
              />

              <div className="relative flex items-center justify-between px-6 pb-5 pt-[calc(env(safe-area-inset-top)+20px)]">
                <Logo size="sm" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  autoFocus
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-navy/[0.14] bg-surface text-navy transition-colors hover:bg-soft-blue"
                >
                  <X className="h-5 w-5" strokeWidth={2.4} />
                </button>
              </div>

              <nav className="relative flex-1 overflow-y-auto px-4">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group relative flex items-center justify-between rounded-2xl px-4 py-4 font-body text-[17px] font-bold transition-colors ${
                          active ? "bg-soft-blue text-navy" : "text-[#3A4A63] hover:bg-surface"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {active && <span className="h-5 w-[3px] rounded-full bg-green" />}
                          {link.label}
                        </span>
                        <ChevronRight
                          className={`h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5 ${
                            active ? "text-green" : "text-faint"
                          }`}
                          strokeWidth={2.4}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-t border-navy/[0.07] bg-white/80 px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-5 backdrop-blur-sm"
              >
                <Link
                  href="/#appointment"
                  onClick={() => setOpen(false)}
                  className="aj-cta-wave flex items-center justify-center gap-2.5 rounded-2xl bg-navy py-4 font-body text-base font-bold text-white shadow-[0_16px_30px_-16px_rgba(12,46,110,0.7)]"
                >
                  <span>Book Appointment</span>
                  <span className="aj-cta-dot flex h-7 w-7 items-center justify-center rounded-full bg-green-bright text-[#083b20]">
                    <ArrowUpRight className="h-[15px] w-[15px]" strokeWidth={2.6} />
                  </span>
                </Link>

                <a
                  href={siteConfig.phoneHref}
                  className="mt-3 flex items-center justify-center gap-2.5 rounded-2xl border border-navy/[0.14] py-3.5 font-body text-[15px] font-bold text-navy transition-colors hover:bg-surface"
                >
                  <Phone className="h-4 w-4 text-green-deep" strokeWidth={2.2} />
                  {siteConfig.phone}
                </a>

                <div className="mt-4 flex items-center justify-center gap-2 font-body text-[11px] font-semibold text-muted">
                  <Clock className="h-3.5 w-3.5 text-green-deep" strokeWidth={2.2} />
                  {siteConfig.hoursShort}
                  <span className="text-faint">·</span>
                  <span className="inline-flex items-center gap-1.5 text-green-deep">
                    <span className="h-[6px] w-[6px] rounded-full bg-green-bright shadow-[0_0_0_3px_rgba(52,208,88,0.25)]" />
                    {siteConfig.roundTheClock}
                  </span>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
