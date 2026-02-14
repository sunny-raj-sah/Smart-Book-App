import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function AppShell({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55]" />
        <div
          className={cn(
            "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
