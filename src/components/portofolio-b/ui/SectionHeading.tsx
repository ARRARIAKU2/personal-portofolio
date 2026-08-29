import { cn } from "@/lib/portofolio-b/cn";
import { Kicker } from "./Kicker";

export function SectionHeading({
  kicker,
  title,
  intro,
  id,
  align = "left",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** id for the <h2>, used by section aria-labelledby. */
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2
        id={id}
        className="max-w-[20ch] text-3xl font-semibold leading-[1.08] tracking-tight text-[var(--ark-ink)] md:text-5xl"
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "max-w-[58ch] text-base leading-relaxed text-[var(--ark-gray)] md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
