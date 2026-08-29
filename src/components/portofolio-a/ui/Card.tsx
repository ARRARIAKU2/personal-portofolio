import { cn } from "@/lib/portofolio-a/cn";

/** Elevated surface. Use only where elevation communicates hierarchy. */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/[0.03] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20",
        className
      )}
      {...props}
    />
  );
}
