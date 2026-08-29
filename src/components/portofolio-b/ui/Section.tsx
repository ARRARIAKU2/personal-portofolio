import { cn } from "@/lib/portofolio-b/cn";
import { Container } from "./Container";

/** Semantic <section> with consistent vertical rhythm + sticky-nav scroll offset. */
export function Section({
  id,
  labelledBy,
  className,
  containerClassName,
  children,
  bare = false,
}: {
  id: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  /** skip the inner Container (section manages its own layout). */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-20 py-20 md:py-28", className)}
    >
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
