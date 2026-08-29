import { Section } from "@/components/portofolio-b/ui/Section";
import { SectionHeading } from "@/components/portofolio-b/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/portofolio-b/ui/Reveal";
import { processSteps } from "../data/steps";

export function Process() {
  return (
    <Section
      id="proses"
      labelledBy="proses-title"
      className="border-y border-[var(--ark-line)] bg-[var(--ark-surface)]"
    >
      <SectionHeading
        id="proses-title"
        kicker="Proses Kerja"
        title="Dari obrolan pertama sampai serah terima kunci."
        intro="Lima tahap yang jelas, sehingga Anda selalu tahu di mana posisi proyek dan apa yang Anda terima di tiap langkah."
        className="max-w-3xl"
      />

      <RevealGroup as="ol" className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--ark-line)] bg-[var(--ark-line)] md:grid-cols-5">
        {processSteps.map((step) => (
          <RevealItem
            as="li"
            key={step.no}
            className="flex flex-col bg-[var(--ark-surface)] p-6"
          >
            <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-semibold text-[var(--ark-accent)]">
              {step.no}
            </span>
            <span className="mt-1 h-px w-8 bg-[var(--ark-accent)]" aria-hidden />
            <h3 className="mt-4 text-base font-semibold text-[var(--ark-ink)]">
              {step.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ark-gray)]">
              {step.desc}
            </p>
            <p className="mt-4 border-t border-[var(--ark-line)] pt-3 font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.12em] text-[var(--ark-gray)]">
              {step.deliverable}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
