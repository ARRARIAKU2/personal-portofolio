import { HiCheck } from "react-icons/hi";
import { Section } from "@/components/portofolio-b/ui/Section";
import { Kicker } from "@/components/portofolio-b/ui/Kicker";
import { ImageSlot } from "@/components/portofolio-b/ui/ImageSlot";
import { Reveal } from "@/components/portofolio-b/ui/Reveal";
import { aboutContent } from "../data/about";

export function About() {
  return (
    <Section
      id="tentang"
      labelledBy="tentang-title"
      containerClassName="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
    >
      {/* Left — image with offset accent frame */}
      <Reveal className="hidden lg:col-span-5 lg:block">
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
          <div
            className="absolute -left-4 -top-4 h-full w-full rounded-2xl border border-[var(--ark-accent)]/40"
            aria-hidden
          />
          <ImageSlot
            ratio="4/5"
            path="/portofolio-b/about-studio.jpg"
            src="/portofolio-b/about-studio.jpg"
            alt="Tim ARK Design meninjau maket dan gambar kerja di studio"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="relative"
          />
        </div>
      </Reveal>

      {/* Right — narrative */}
      <div className="lg:col-span-7">
        <Reveal>
          <Kicker>{aboutContent.kicker}</Kicker>
          <h2
            id="tentang-title"
            className="mt-5 max-w-[18ch] text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--ark-ink)] md:text-4xl"
          >
            {aboutContent.title}
          </h2>
          <div className="mt-6 space-y-4">
            {aboutContent.body.map((p, i) => (
              <p
                key={i}
                className="max-w-[62ch] text-base leading-relaxed text-[var(--ark-gray)] md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-[var(--ark-line)] bg-[var(--ark-line)] sm:grid-cols-3">
          {aboutContent.pillars.map((pillar) => (
            <div key={pillar.title} className="bg-[var(--ark-bg)] p-5">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--ark-accent)]/12 text-[var(--ark-accent-ink)]">
                <HiCheck className="size-4" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-[var(--ark-ink)]">
                {pillar.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--ark-gray)]">
                {pillar.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
