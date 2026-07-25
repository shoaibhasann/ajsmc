import {
  Activity,
  Baby,
  Bone,
  Brain,
  Droplet,
  Eye,
  FlaskConical,
  HeartPulse,
  Siren,
  Sparkles,
  Stethoscope,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import type { Specialty } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap: Record<Specialty["icon"], LucideIcon> = {
  eye: Eye,
  sparkles: Sparkles,
  baby: Baby,
  bone: Bone,
  droplet: Droplet,
  "heart-pulse": HeartPulse,
  stethoscope: Stethoscope,
  activity: Activity,
  flower: Flower2,
  brain: Brain,
  flask: FlaskConical,
  siren: Siren,
};

/**
 * The shared blue→green brand chip + white glyph used for every specialty, so the
 * home preview and the Specialties page stay in sync.
 */
export function SpecialtyIcon({
  icon,
  className,
}: {
  icon: Specialty["icon"];
  className?: string;
}) {
  const Icon = iconMap[icon];
  return (
    <span
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-blue to-green text-white shadow-[0_10px_20px_-10px_rgba(23,196,107,0.7)]",
        className,
      )}
    >
      <Icon className="h-6 w-6" strokeWidth={2.2} />
    </span>
  );
}
