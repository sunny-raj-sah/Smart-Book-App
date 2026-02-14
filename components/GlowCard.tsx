import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export default function GlowCard({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-card-border bg-card shadow-md",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(900px_circle_at_var(--x,30%)_var(--y,20%),hsl(var(--primary)/0.12),transparent_55%)]",
        "hover:before:opacity-100",
        "grain",
        className,
      )}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--x", `${x}%`);
        e.currentTarget.style.setProperty("--y", `${y}%`);
      }}
    >
      {children}
    </div>
  );
}
