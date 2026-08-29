"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/portofolio-b/ui/Section";
import { SectionHeading } from "@/components/portofolio-b/ui/SectionHeading";
import { ProjectCard } from "@/components/portofolio-b/ui/ProjectCard";
import { cn } from "@/lib/portofolio-b/cn";
import { spring } from "@/features/portofolio-b/shared/motion";
import { useProjectFilter } from "../hooks/useProjectFilter";

export function Portfolio() {
  const { active, setActive, filtered, categories } = useProjectFilter();

  return (
    <Section id="portofolio" labelledBy="portofolio-title">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="portofolio-title"
          kicker="Portofolio"
          title="Karya yang bicara sendiri."
          intro="Sebagian proyek hunian, renovasi, interior, dan komersial yang kami rancang dan bangun."
        />

        {/* Filter chips */}
        <div
          role="tablist"
          aria-label="Filter kategori proyek"
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ark-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ark-bg)]",
                  isActive
                    ? "border-[var(--ark-ink)] bg-[var(--ark-ink)] text-[var(--ark-bg)]"
                    : "border-[var(--ark-line)] text-[var(--ark-gray)] hover:border-[var(--ark-ink)] hover:text-[var(--ark-ink)]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <motion.ul
        layout
        className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={spring}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-[var(--ark-gray)]">
          Belum ada proyek pada kategori ini.
        </p>
      )}
    </Section>
  );
}
