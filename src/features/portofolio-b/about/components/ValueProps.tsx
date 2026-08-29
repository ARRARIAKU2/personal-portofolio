import { Container } from "@/components/portofolio-b/ui/Container";
import { RevealGroup, RevealItem } from "@/components/portofolio-b/ui/Reveal";
import { valueProps } from "../data/values";

/** Keunggulan — differentiator strip, hairline-separated (not boxed). */
export function ValueProps() {
  return (
    <section aria-label="Keunggulan" className="py-16 md:py-20">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-y-8 border-t border-[var(--ark-line)] pt-10 sm:grid-cols-2 sm:divide-x sm:divide-[var(--ark-line)] lg:grid-cols-4">
          {valueProps.map((v) => (
            <RevealItem key={v.title} className="sm:px-6 lg:first:pl-0">
              <span className="block font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold tracking-tight text-[var(--ark-accent-ink)] md:text-3xl">
                {v.metric}
              </span>
              <h3 className="mt-3 text-base font-semibold text-[var(--ark-ink)]">
                {v.title}
              </h3>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-[var(--ark-gray)]">
                {v.desc}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
