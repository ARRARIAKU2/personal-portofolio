import { forwardRef } from "react";
import { cn } from "@/lib/portofolio-b/cn";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--ark-ink)] text-[var(--ark-bg)] hover:bg-black border border-[var(--ark-ink)]",
  secondary:
    "bg-transparent text-[var(--ark-ink)] border border-[var(--ark-ink)]/25 hover:border-[var(--ark-ink)] hover:bg-[var(--ark-ink)]/[0.04]",
  ghost:
    "bg-transparent text-[var(--ark-ink)] hover:bg-[var(--ark-ink)]/[0.06]",
  link: "bg-transparent text-[var(--ark-ink)] px-0 h-auto gap-1.5 hover:text-[var(--ark-accent-ink)]",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ark-bg)]",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variant !== "link" && SIZES[size],
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
