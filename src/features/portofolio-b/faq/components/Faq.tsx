import { Section } from "@/components/portofolio-b/ui/Section";
import { Kicker } from "@/components/portofolio-b/ui/Kicker";
import { ButtonLink } from "@/components/portofolio-b/ui/ButtonLink";
import { Accordion } from "@/components/portofolio-b/ui/Accordion";
import { faqs } from "../data/faq";

export function Faq() {
  return (
    <Section
      id="faq"
      labelledBy="faq-title"
      containerClassName="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Kicker>FAQ</Kicker>
          <h2
            id="faq-title"
            className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--ark-ink)] md:text-4xl"
          >
            Pertanyaan yang sering muncul.
          </h2>
          <p className="mt-5 max-w-[38ch] text-base leading-relaxed text-[var(--ark-gray)]">
            Belum menemukan jawabannya? Tim kami senang menjelaskan langsung.
          </p>
          <ButtonLink href="#kontak" variant="secondary" className="mt-8">
            Tanya langsung
          </ButtonLink>
        </div>
      </div>

      <div className="lg:col-span-8">
        <Accordion items={faqs} />
      </div>
    </Section>
  );
}
