"use client";
import { motion } from "framer-motion";
import { HiArrowRight, HiArrowDown } from "react-icons/hi";
import { Container } from "@/components/portofolio-b/ui/Container";
import { ButtonLink } from "@/components/portofolio-b/ui/ButtonLink";
import { Kicker } from "@/components/portofolio-b/ui/Kicker";
import { ImageSlot } from "@/components/portofolio-b/ui/ImageSlot";
import {
  fadeUp,
  staggerContainer,
  spring,
} from "@/features/portofolio-b/shared/motion";
import { heroContent, heroStats } from "../data/hero";

export function Hero() {
  const handleCta = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="beranda"
      className="relative flex min-h-[100dvh] items-center overflow-x-clip pt-20"
    >
      {/* faint blueprint wash top-right */}
      <div
        className="ark-blueprint pointer-events-none absolute -right-24 top-0 h-[520px] w-[520px] opacity-40 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]"
        aria-hidden
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        {/* Left — content */}
        <motion.div
          className="lg:col-span-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Kicker>{heroContent.kicker}</Kicker>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-[var(--ark-ink)] sm:text-6xl lg:text-[4.25rem]"
          >
            {heroContent.title[0]}
            <br />
            <span className="text-[var(--ark-gray)]">
              {heroContent.title[1]}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[54ch] text-base leading-relaxed text-[var(--ark-gray)] md:text-lg"
          >
            {heroContent.subtitle}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink
              href={heroContent.primaryCta.href}
              onClick={(event) => handleCta(event, heroContent.primaryCta.href)}
              size="lg"
            >
              {heroContent.primaryCta.label}
              <HiArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href={heroContent.secondaryCta.href}
              onClick={(event) => handleCta(event, heroContent.secondaryCta.href)}
              variant="secondary"
              size="lg"
            >
              {heroContent.secondaryCta.label}
            </ButtonLink>
          </motion.div>

          {/* Stats — hairline separated, not boxed */}
          <motion.dl
            variants={fadeUp}
            className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-[var(--ark-line)] border-t border-[var(--ark-line)] pt-6"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="px-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold text-[var(--ark-ink)] md:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-[var(--ark-gray)]">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Right — architectural visual */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <ImageSlot
              ratio="4/5"
              path="/portofolio-b/hero-villa.jpg"
              src="/portofolio-b/hero-villa.jpg"
              alt="Fasad hunian modern minimalis karya ARK Design"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="shadow-[0_30px_60px_-30px_rgba(23,24,26,0.35)]"
            />
            {/* floating brass caption chip */}
            <div className="absolute -bottom-4 -left-2 rounded-xl border border-[var(--ark-line)] bg-[var(--ark-surface)] px-4 py-3 shadow-lg sm:-bottom-5 sm:-left-5 sm:px-5 sm:py-4">
              <p className="font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.16em] text-[var(--ark-gray)]">
                Proyek terbaru
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--ark-ink)]">
                Rumah Nawasena · Bandung
              </p>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* scroll cue */}
      <motion.a
        href="#tentang"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("tentang")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-[var(--ark-gray)] transition-colors hover:text-[var(--ark-ink)] lg:inline-flex"
      >
        Gulir untuk menjelajah{" "}
        <HiArrowDown className="size-3.5 animate-bounce" />
      </motion.a>
    </section>
  );
}
