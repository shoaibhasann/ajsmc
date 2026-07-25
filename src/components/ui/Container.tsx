import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
