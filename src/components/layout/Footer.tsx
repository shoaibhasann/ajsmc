import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { assets } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Specialities", href: "/#specialties" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Reach Us", href: "/contact" },
];

const specialtyLinks = [
  "Ophthalmology",
  "Dermatology",
  "Paediatrics",
  "Orthopaedics",
  "Gynaecology",
  "Diabetology",
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-9 py-14 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            {/* Crest on a white tile — it's a blue/red mark that would vanish on the navy footer. */}
            <span className="flex h-11 w-11 items-center justify-center rounded-[13px] aj-card p-1.5 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)]">
              <Image
                src={assets.logo.src}
                alt=""
                width={assets.logo.width}
                height={assets.logo.height}
                className="h-full w-auto object-contain"
              />
            </span>
            <span className="leading-none">
              <span className="block font-heading text-xl font-extrabold text-white">AJSMC</span>
              <span className="mt-0.5 block font-body text-[10px] font-semibold tracking-[0.14em] text-white/55">
                MULTI&ndash;SPECIALITY
              </span>
            </span>
          </div>
          <p className="mb-5 max-w-[300px] font-body text-sm leading-relaxed text-white/65">
            A multi speciality hospital on Police Commissioner Office Road, Egmore, Chennai. Every
            specialist, one roof, affordable for all.
          </p>
          <div className="flex gap-2.5">
            <a
              href={siteConfig.social.facebook}
              aria-label="AJSMC on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/[0.08] text-white transition-colors hover:bg-green"
            >
              <FacebookIcon className="h-[17px] w-[17px]" />
            </a>
            <a
              href={siteConfig.social.instagram}
              aria-label="AJSMC on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-white/[0.08] text-white transition-colors hover:bg-green"
            >
              <InstagramIcon className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-[15px] font-bold text-white">Quick Links</h4>
          <div className="flex flex-col gap-2.5 font-body text-sm">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-white/65 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-[15px] font-bold text-white">Specialities</h4>
          <div className="flex flex-col gap-2.5 font-body text-sm">
            {specialtyLinks.map((s) => (
              <Link key={s} href="/#specialties" className="text-white/65 hover:text-white">
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h4 className="mb-4 font-heading text-[15px] font-bold text-white">Get In Touch</h4>
          <div className="flex flex-col gap-3.5 font-body text-[13px] leading-relaxed text-white/65">
            <a
              href={siteConfig.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 h-[17px] w-[17px] shrink-0 text-green-bright" strokeWidth={2} />
              {siteConfig.address.full}
            </a>
            <span className="flex items-center gap-2.5">
              <Phone className="h-[17px] w-[17px] shrink-0 text-green-bright" strokeWidth={2} />
              {siteConfig.phone} &middot; {siteConfig.mobile}
            </span>
            <span className="flex items-center gap-2.5">
              <Mail className="h-[17px] w-[17px] shrink-0 text-green-bright" strokeWidth={2} />
              {siteConfig.email}
            </span>
            <span className="flex items-center gap-2.5">
              <Clock className="h-[17px] w-[17px] shrink-0 text-green-bright" strokeWidth={2} />
              {siteConfig.hoursShort} &middot; {siteConfig.roundTheClock}
            </span>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        {/* Extra bottom padding on mobile keeps the last row clear of the floating
            WhatsApp button; back to normal from sm up. */}
        <Container className="flex flex-col items-center gap-4 pb-24 pt-5 text-center font-body text-[13px] text-white/50 sm:flex-row sm:justify-between sm:pb-5 sm:text-left">
          <span>&copy; {new Date().getFullYear()} AJ Subaitha Medical Centre. All rights reserved.</span>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <span className="flex gap-5">
              <Link href="/privacy-policy" className="text-white/50 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white/50 hover:text-white">
                Terms of Service
              </Link>
            </span>
            {/* The whole credit is the link, not just the name — a two-word target in a
                footer is a small thing to hit, on a phone especially. */}
            <a
              href="https://zyntec.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Design and developed by Zyntec — visit zyntec.in (opens in a new tab)"
              className="inline-flex items-center gap-1.5 text-white/45 transition-colors hover:text-white/80"
            >
              <span aria-hidden>✨</span>
              Design &amp; Developed by{" "}
              <span className="font-bold tracking-wide text-white/75">ZYNTEC</span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
