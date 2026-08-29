import { ImQuotesLeft } from "react-icons/im";
import type { Testimonial } from "@/features/portofolio-b/testimonials/data/testimonials";

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-[var(--ark-line)] bg-[var(--ark-bg)] p-7">
      <ImQuotesLeft className="size-6 text-[var(--ark-accent)]" aria-hidden />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-[var(--ark-ink)]">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--ark-line)] pt-5">
        <span
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--ark-ink)] font-[family-name:var(--font-space-grotesk)] text-sm font-medium text-[var(--ark-bg)]"
          aria-hidden
        >
          {item.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-[var(--ark-ink)]">
            {item.name}
          </span>
          <span className="block text-xs text-[var(--ark-gray)]">
            {item.role} · {item.project}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
