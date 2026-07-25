import Link from "next/link";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  light = false,
  size = "md",
  className,
}: {
  light?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const height = size === "sm" ? 38 : 44;
  // Derived from the asset, so the crest never stretches if the artwork is reswapped.
  const width = Math.round((height * assets.logo.width) / assets.logo.height);

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={assets.logo.src}
        // Decorative — the link itself is already labelled.
        alt=""
        width={width}
        height={height}
        loading="eager"
        className="shrink-0"
      />
      <span className="leading-none">
        <span
          className={cn(
            "block font-heading font-extrabold tracking-tight",
            size === "sm" ? "text-lg" : "text-xl",
            light ? "text-white" : "text-navy",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "mt-0.5 block font-body text-[10px] font-semibold tracking-[0.14em]",
            light ? "text-white/55" : "text-muted",
          )}
        >
          MULTI&ndash;SPECIALTY
        </span>
      </span>
    </Link>
  );
}
