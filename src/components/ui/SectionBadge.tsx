import { cn } from "@/lib/utils";

/*
 * `solid` fills with green-deep rather than green. White on #17c46b measured 2.30:1 against
 * the 4.5:1 this size of text needs; on green-deep it is 5.43:1. --color-green stays what it
 * is — it is a fill behind icons and gradients, not a surface anything is read off.
 */
const toneClasses = {
  green: "bg-soft-green text-green-deep",
  blue: "bg-soft-blue text-blue",
  solid: "bg-green-deep text-white",
};

export function SectionBadge({
  children,
  tone = "green",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClasses;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 font-body text-xs font-bold tracking-[0.14em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
