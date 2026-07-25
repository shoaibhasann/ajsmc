import Image from "next/image";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Doctor } from "@/lib/site";

/**
 * A doctor's portrait, or the placeholder tile until a photo URL is supplied.
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
    return <ImageSlot label="Dr. photo" tone="blue" />;
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
