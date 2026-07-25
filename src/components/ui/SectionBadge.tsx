import { cn } from "@/lib/utils";

const toneClasses = {
  green: "bg-soft-green text-green-deep",
  blue: "bg-soft-blue text-blue",
  solid: "bg-green text-white",
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
