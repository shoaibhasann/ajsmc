import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * The primary "Book Appointment" call-to-action, in the main navy-pill style with
 * the wave hover. Centres itself; drop it below a section's content.
 */
export function BookCta({
  label = "Book an Appointment",
  href = "/contact",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Link
        href={href}
        className="aj-cta-wave inline-flex items-center gap-3 rounded-full bg-navy py-[9px] pl-[26px] pr-[9px] font-body text-base font-bold text-white shadow-[0_18px_34px_-16px_rgba(12,46,110,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
      >
        <span>{label}</span>
        <span className="aj-cta-dot flex h-10 w-10 items-center justify-center rounded-full bg-green-bright text-[#083b20]">
          <ArrowUpRight className="h-[17px] w-[17px]" strokeWidth={2.6} />
        </span>
      </Link>
    </div>
  );
}
