import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function SectionContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-7xl justify-between px-8 pb-24",
        className
      )}
    >
      {children}
    </section>
  );
}
