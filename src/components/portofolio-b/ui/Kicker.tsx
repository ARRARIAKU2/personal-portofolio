import { cn } from "@/lib/portofolio-b/cn";

/** Technical uppercase label with a brass tick — sets the architectural tone. */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xs font-medium uppercase tracking-[0.22em] text-[var(--ark-gray)]",
        className
      )}
    >
      <span className="h-px w-6 bg-[var(--ark-accent)]" aria-hidden />
      {children}
    </span>
  );
}
