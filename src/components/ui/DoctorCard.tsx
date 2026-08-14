import Link from "next/link";
import { DoctorPhoto } from "@/components/ui/DoctorPhoto";
import { type Doctor } from "@/lib/site";

/**
 * Doctor card: photo fills a white→blue gradient tile, with a frosted-glass panel
 * floating over the lower edge that carries the name, role and quick actions.
 * `object-top` (in DoctorPhoto) keeps the face above the glass panel.
 *
 * The whole card links to the consultant's own page. A named page per doctor is the
 * cheapest authority a hospital site has — it is the only place the registration number
 * is verifiable, and near-branded searches for a consultant's name reach it directly.
 */
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group relative block h-[380px] overflow-hidden rounded-[24px] border border-[#d3e3f5] bg-gradient-to-b from-[#EAF2FC] via-[#D6E6F7] to-[#B9D4F0] shadow-[0_26px_48px_-30px_rgba(12,46,110,0.5)] transition-shadow hover:shadow-[0_30px_56px_-26px_rgba(12,46,110,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
    >
      <DoctorPhoto doctor={doctor} sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" />

      {/* The photos have white studio backdrops that hid the card gradient. A
          multiply-blended blue wash grades the whole card blue→white while
          leaving faces and coats readable (lighter at top, bluer toward the base). */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F3F8FD] via-[#DBE9F8] to-[#B7D3F1] mix-blend-multiply"
      />

      {doctor.tag && (
        <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-green-bright px-[11px] py-[5px] font-body text-[11px] font-bold text-[#083b20] shadow-[0_8px_18px_-8px_rgba(52,208,88,0.9)]">
          {doctor.tag}
        </span>
      )}

      {/* Frosted panel — translucent so the photo reads through its top edge. */}
      <div className="absolute inset-x-3 bottom-3 rounded-[18px] border border-white/70 bg-white/55 p-3.5 shadow-[0_18px_34px_-22px_rgba(12,46,110,0.6)] backdrop-blur-md">
        <h3 className="font-heading text-[16px] font-bold leading-tight text-navy">{doctor.name}</h3>
        <p className="mt-0.5 font-body text-[12px] font-semibold text-green-deep">{doctor.specialty}</p>
        {doctor.degree && (
          <p className="mt-0.5 line-clamp-1 font-body text-[10.5px] leading-snug text-muted">{doctor.degree}</p>
        )}
      </div>
    </Link>
  );
}
