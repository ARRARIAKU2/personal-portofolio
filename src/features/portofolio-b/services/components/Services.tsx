import { HiArrowRight } from "react-icons/hi";
import { Section } from "@/components/portofolio-b/ui/Section";
import { Kicker } from "@/components/portofolio-b/ui/Kicker";
import { ButtonLink } from "@/components/portofolio-b/ui/ButtonLink";
import { RevealGroup, RevealItem } from "@/components/portofolio-b/ui/Reveal";
import { services } from "../data/services";

export function Services() {
  return (
    <Section
      id="layanan"
      labelledBy="layanan-title"
      className="border-y border-[var(--ark-line)] bg-[var(--ark-surface)]"
      containerClassName="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
    >
      {/* Left — sticky intro */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <Kicker>Layanan</Kicker>
          <h2
            id="layanan-title"
            className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--ark-ink)] md:text-4xl"
          >
            Lima layanan, satu tanggung jawab.
          </h2>
          <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-[var(--ark-gray)]">
            Dari perencanaan hingga serah terima, setiap layanan dikerjakan tim
            yang sama agar mutu dan niat desain tetap terjaga.
          </p>
          <ButtonLink href="#kontak" variant="secondary" className="mt-8">
            Diskusikan proyek Anda
            <HiArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </div>

      {/* Right — numbered list */}
      <RevealGroup as="ul" className="lg:col-span-8">
        {services.map((s) => (
          <RevealItem
            as="li"
            key={s.id}
            className="group border-t border-[var(--ark-line)] py-7 last:border-b"
          >
            <div className="flex items-start gap-5 md:gap-8">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--ark-line)] text-[var(--ark-ink)] transition-colors group-hover:border-[var(--ark-accent)] group-hover:text-[var(--ark-accent-ink)]">
                <s.icon className="size-5" strokeWidth={1.5} />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[var(--ark-ink)] md:text-xl">
                    {s.title}
                  </h3>
                  <HiArrowRight className="size-5 shrink-0 -translate-x-1 text-[var(--ark-gray)] opacity-0 transition-all group-hover:translate-x-0 group-hover:text-[var(--ark-accent-ink)] group-hover:opacity-100" />
                </div>
                <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-[var(--ark-gray)] md:text-base">
                  {s.desc}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-xs text-[var(--ark-gray)]"
                    >
                      <span
                        className="size-1 rounded-full bg-[var(--ark-accent)]"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
