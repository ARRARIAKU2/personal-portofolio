import { HiArrowRight } from "react-icons/hi";
import { Container } from "@/components/portofolio-b/ui/Container";
import { CtaBanner } from "@/components/portofolio-b/ui/CtaBanner";
import { ButtonLink } from "@/components/portofolio-b/ui/ButtonLink";
import { Reveal } from "@/components/portofolio-b/ui/Reveal";
import { BRAND } from "@/features/portofolio-b/shared/nav";

export function Cta() {
  return (
    <section aria-label="Ajakan konsultasi" className="py-8 md:py-12">
      <Container>
        <Reveal>
          <CtaBanner
            eyebrow="Konsultasi gratis"
            title="Punya lahan atau rencana renovasi? Mari kita mulai dari obrolan."
          >
            <ButtonLink
              href="#kontak"
              size="lg"
              className="border-[var(--ark-bg)] bg-[var(--ark-bg)] text-[var(--ark-ink)] hover:bg-white"
            >
              Jadwalkan konsultasi
              <HiArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="secondary"
              className="border-white/25 text-[var(--ark-bg)] hover:border-white/60 hover:bg-white/5"
            >
              Chat WhatsApp
            </ButtonLink>
          </CtaBanner>
        </Reveal>
      </Container>
    </section>
  );
}
