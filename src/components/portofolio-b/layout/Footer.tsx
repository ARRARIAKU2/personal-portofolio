"use client";
import { FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";
import { Container } from "@/components/portofolio-b/ui/Container";
import { NAV_LINKS, BRAND } from "@/features/portofolio-b/shared/nav";

const SERVICES_LINKS = [
  "Konstruksi Rumah",
  "Renovasi",
  "Desain Arsitektur",
  "Interior & Fit-out",
  "Konsultasi & Perencanaan",
];

export function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-[var(--ark-ink)] text-[var(--ark-bg)]">
      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden>
              <rect x="1" y="1" width="26" height="26" rx="5" stroke="var(--ark-bg)" strokeWidth="1.5" />
              <path d="M8 20 14 8l6 12" stroke="var(--ark-bg)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M10.6 15h6.8" stroke="var(--ark-accent)" strokeWidth="1.5" />
            </svg>
            <span className="text-lg font-semibold tracking-tight">
              ARK <span className="font-normal text-white/55">Design</span>
            </span>
          </div>
          <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-white/60">
            Studio arsitektur dan konstruksi yang merancang, membangun, dan
            merapikan detail akhir dalam satu tim yang terukur sejak {BRAND.established}.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Social href={BRAND.instagram} label="Instagram">
              <FaInstagram className="size-4" />
            </Social>
            <Social href={BRAND.whatsapp} label="WhatsApp">
              <FaWhatsapp className="size-4" />
            </Social>
            <Social href="#" label="LinkedIn">
              <FaLinkedinIn className="size-4" />
            </Social>
          </div>
        </div>

        {/* Nav */}
        <nav className="md:col-span-3" aria-label="Peta situs">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Navigasi
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div className="md:col-span-2">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Layanan
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {SERVICES_LINKS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-2">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
            Kontak
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a href={BRAND.phoneHref} className="hover:text-white">
                {BRAND.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="hover:text-white">
                {BRAND.email}
              </a>
            </li>
            <li className="leading-relaxed">{BRAND.address}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/45">
            © {BRAND.established}–2026 {BRAND.name}. Seluruh hak cipta dilindungi.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white"
          >
            Kembali ke atas <HiArrowUp className="size-3.5" />
          </button>
        </Container>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)]"
    >
      {children}
    </a>
  );
}
