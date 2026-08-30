import { Container } from "@/components/portofolio-b/ui/Container";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/portofolio-b/ui/Reveal";
import { Kicker } from "@/components/portofolio-b/ui/Kicker";
import { valueProps, valueContent } from "../data/values";

/** Keunggulan — differentiator strip, hairline-separated (not boxed). */
export function ValueProps() {
  return (
    <section aria-label="Keunggulan" className="">
      <Container>
        <Reveal>
          <Kicker>{valueContent.kicker}</Kicker>
          <h2
            id="tentang-title"
            className="mt-5 max-w-[18ch] text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--ark-ink)] md:text-4xl"
          >
            {valueContent.title}
          </h2>
          {/* <div className="mt-6 space-y-4">
            {valueContent.body.map((p, i) => (
              <p
                key={i}
                className="max-w-[62ch] text-base leading-relaxed text-[var(--ark-gray)] md:text-lg"
              >
                {p}
              </p>
            ))}
          </div> */}
        </Reveal>
        <RevealGroup className="grid grid-cols-1 gap-y-8 border-t border-[var(--ark-line)] py-10 sm:grid-cols-2 sm:divide-x sm:divide-[var(--ark-line)] lg:grid-cols-4">
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
