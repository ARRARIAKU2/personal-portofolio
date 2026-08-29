"use client";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuArrowLeft } from "react-icons/lu";
import { cn } from "@/lib/portofolio-b/cn";
import { NAV_LINKS, BRAND } from "@/features/portofolio-b/shared/nav";
import { ButtonLink } from "@/components/portofolio-b/ui/ButtonLink";
import { Container } from "@/components/portofolio-b/ui/Container";
import { Wordmark } from "./Wordmark";

/** Smooth-scroll to a section, accounting for the sticky header height. */
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (id: string) => {
    setOpen(false);
    // wait for menu close before scrolling on mobile
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--ark-line)] bg-[var(--ark-bg)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNav("beranda");
          }}
          className="inline-flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)]"
          aria-label={`${BRAND.name} — ke atas`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Navigasi utama" className="hidden min-[816px]:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.id);
                  }}
                  className="text-sm text-[var(--ark-ink)]/80 transition-colors hover:text-[var(--ark-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ark-bg)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 min-[816px]:flex">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <LuArrowLeft className="size-4" />
            <span className="hidden sm:inline">Main site</span>
          </a>
          <ButtonLink
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              handleNav("kontak");
            }}
            size="md"
          >
            Konsultasi Gratis
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-[var(--ark-ink)] min-[816px]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)]"
          aria-expanded={open}
          aria-controls="ark-mobile-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <HiOutlineX className="size-6" />
          ) : (
            <HiOutlineMenu className="size-6" />
          )}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="ark-mobile-menu"
        className={cn(
          "min-[816px]:hidden overflow-hidden border-t border-[var(--ark-line)] bg-[var(--ark-bg)] transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNav(link.id);
              }}
              className="rounded-lg px-3 py-3 text-base text-[var(--ark-ink)] hover:bg-[var(--ark-ink)]/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-3 text-base text-[var(--ark-ink)] hover:bg-[var(--ark-ink)]/[0.05]"
          >
            <LuArrowLeft className="size-4" />
            <span>Main site</span>
          </a>
          <ButtonLink
            href="#kontak"
            onClick={(e) => {
              e.preventDefault();
              handleNav("kontak");
            }}
            className="mt-2 w-full"
          >
            Konsultasi Gratis
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
