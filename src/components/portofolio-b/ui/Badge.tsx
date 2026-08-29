import { cn } from "@/lib/portofolio-b/cn";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "neutral" &&
          "border-[var(--ark-line)] bg-white/60 text-[var(--ark-gray)]",
        tone === "accent" &&
          "border-[var(--ark-accent)]/30 bg-[var(--ark-accent)]/10 text-[var(--ark-accent-ink)]",
        className
      )}
    >
      {children}
    </span>
  );
}
