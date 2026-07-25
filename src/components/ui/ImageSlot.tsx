import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const toneClasses = {
  blue: "bg-tile-blue text-blue/40",
  green: "bg-tile-green text-green-deep/40",
  navy: "bg-gradient-to-br from-navy-mid to-navy-dark text-white/25",
};

/**
 * Standing in for client-supplied photography (see the asset checklist) —
 * keeps layout/aspect ratio correct so real photos drop in without touching CSS.
 */
export function ImageSlot({
  label,
  tone = "blue",
  shape = "rect",
  className,
}: {
  label: string;
  tone?: keyof typeof toneClasses;
  shape?: "rect" | "circle";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center",
        toneClasses[tone],
        shape === "circle" ? "rounded-full" : "",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <ImageIcon className="h-7 w-7" strokeWidth={1.5} />
      <span className="font-body text-[11px] font-semibold leading-tight opacity-90">
        {label}
      </span>
    </div>
  );
}
