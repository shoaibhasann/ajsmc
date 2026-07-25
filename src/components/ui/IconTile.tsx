import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const toneClasses = {
  green: "bg-soft-green text-green-deep",
  blue: "bg-soft-blue text-blue",
  navy: "bg-navy text-white",
  "navy-soft": "bg-white/10 text-green-bright",
  "on-navy": "bg-green-bright/20 text-green-bright",
};

export function IconTile({
  icon: Icon,
  tone = "green",
  size = 48,
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof toneClasses;
  size?: 40 | 44 | 46 | 48 | 52;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl",
        toneClasses[tone],
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Icon className="h-1/2 w-1/2" strokeWidth={1.8} />
    </span>
  );
}
