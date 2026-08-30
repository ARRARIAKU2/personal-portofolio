import { cn } from "@/lib/portofolio-b/cn";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "link"
  | "inverted"
  | "invertedOutline";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--ark-ink)] text-[var(--ark-bg)] hover:bg-black border border-[var(--ark-ink)]",
  secondary:
    "bg-transparent text-[var(--ark-ink)] border border-[var(--ark-ink)]/25 hover:border-[var(--ark-ink)] hover:bg-[var(--ark-ink)]/[0.04]",
  ghost: "bg-transparent text-[var(--ark-ink)] hover:bg-[var(--ark-ink)]/[0.06]",
  link: "bg-transparent text-[var(--ark-ink)] px-0 h-auto gap-1.5 hover:text-[var(--ark-accent-ink)]",
  // For dark surfaces (e.g. CtaBanner): filled bone + inverted outline.
  inverted:
    "bg-[var(--ark-bg)] text-[var(--ark-ink)] border border-[var(--ark-bg)] hover:bg-white hover:border-white",
  invertedOutline:
    "bg-transparent text-[var(--ark-bg)] border border-white/25 hover:border-white/60 hover:bg-white/5",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

/** Anchor styled as a button — for smooth-scroll section links (#portofolio, #kontak). */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ark-bg)]",
        "active:scale-[0.98]",
        variant !== "link" && SIZES[size],
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
