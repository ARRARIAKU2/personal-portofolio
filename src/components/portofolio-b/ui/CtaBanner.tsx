import { cn } from "@/lib/portofolio-b/cn";

/** Reusable dark conversion banner with an optional blueprint texture. */
export function CtaBanner({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** action(s) — pass ButtonLink/Button. */
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-[var(--ark-ink)] px-6 py-14 text-center md:px-16 md:py-20",
        className
      )}
    >
      <div
        className="ark-blueprint pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        {eyebrow && (
          <span className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-[0.22em] text-[var(--ark-accent)]">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-[var(--ark-bg)] md:text-4xl">
          {title}
        </h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
