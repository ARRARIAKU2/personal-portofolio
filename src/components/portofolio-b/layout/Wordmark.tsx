import { cn } from "@/lib/portofolio-b/cn";

/** ARK Design wordmark — geometric monogram + name. Pure SVG, no asset needed. */
export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "bg";
}) {
  const color = tone === "ink" ? "var(--ark-ink)" : "var(--ark-bg)";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 28 28"
        className="h-7 w-7"
        fill="none"
        aria-hidden
        style={{ color }}
      >
        <rect x="1" y="1" width="26" height="26" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20 14 8l6 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10.6 15h6.8" stroke="var(--ark-accent)" strokeWidth="1.5" />
      </svg>
      <span
        className="text-lg font-semibold tracking-tight"
        style={{ color }}
      >
        ARK <span className="font-normal text-[var(--ark-gray)]">Design</span>
      </span>
    </span>
  );
}
