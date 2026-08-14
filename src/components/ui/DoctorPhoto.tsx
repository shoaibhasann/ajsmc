import Image from "next/image";
import { Plus, UserRound } from "lucide-react";
import type { Doctor } from "@/lib/site";

/**
 * A doctor's portrait, or an on-brand avatar placeholder until a photo URL is supplied.
 * `object-top` keeps the face in frame when the card crops the lower body.
 */
export function DoctorPhoto({
  doctor,
  sizes = "(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw",
}: {
  doctor: Doctor;
  sizes?: string;
}) {
  if (!doctor.image) {
    return (
      <div
        role="img"
        aria-label={`${doctor.name}, ${doctor.specialty} — portrait coming soon`}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-[40%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="relative flex h-[108px] w-[108px] items-center justify-center rounded-full border border-white/70 bg-white/55 text-navy shadow-[0_18px_34px_-20px_rgba(12,46,110,0.55)] backdrop-blur-sm">
            <UserRound className="h-[54px] w-[54px]" strokeWidth={1.5} />
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-green to-green-deep text-white shadow-[0_8px_16px_-6px_rgba(23,196,107,0.8)]">
              <Plus className="h-4 w-4" strokeWidth={2.8} />
            </span>
          </span>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={doctor.image}
      alt={`${doctor.name}, ${doctor.specialty}`}
      fill
      sizes={sizes}
      className="object-cover object-top"
    />
  );
}
