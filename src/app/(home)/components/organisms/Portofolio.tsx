"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { fadeIn } from "@/app/(home)/components/variant";

interface Project {
  no: string;
  title: string;
  kind: string;
  href: string;
  description: string;
  tags: string[];
}

// Portfolios built inside this project. Each href routes to a live build.
const projects: Project[] = [
  {
    no: "01",
    title: "CRM",
    kind: "Dashboard",
    href: "/portofolio-a",
    description:
      "A frontend-only enterprise CRM: seven roles with permissions enforced route-, widget- and action-deep, a drag-and-drop deal pipeline, and an append-only audit trail you can filter and export.",
    tags: ["Next.js", "TanStack Query", "dnd-kit", "RBAC"],
  },
  {
    no: "02",
    title: "ARK Design",
    kind: "Landing page",
    href: "/portofolio-b",
    description:
      "A premium, frontend-only landing page for a modern-minimalist architecture & construction studio: filterable portfolio, five-step process, accessible FAQ, and a Zod-validated contact form — with per-page SEO and blueprint placeholder art.",
    tags: ["Next.js", "Framer Motion", "React Hook Form", "Zod"],
  },
];

function Portofolio() {
  return (
    <section id="portofolio" className="min-h-[100dvh] flex items-center py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8">
          {/* Sticky heading column — asymmetric, left-aligned */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-24">
              <span className="text-sm uppercase tracking-[0.3em] text-accent">
                Selected builds
              </span>
              <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none">
                Portfolio
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60 max-w-[40ch]">
                Products built end to end inside this project. Open one to walk
                through the real thing.
              </p>
            </div>
          </motion.div>

          {/* Divided list of live builds */}
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col divide-y divide-white/10 border-t border-white/10">
            {projects.map((project, index) => (
              <motion.div
                key={project.no}
                variants={fadeIn("up", 0.2 + index * 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                <Link
                  href={project.href}
                  className="group block py-8 lg:py-10 transition-colors duration-300"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-lg text-white/30 group-hover:text-accent transition-colors duration-300 pt-1">
                      {project.no}
                    </span>
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wide text-white/40">
                        {project.kind}
                      </span>
                      <div className="mt-1 flex items-center justify-between gap-4">
                        <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <HiArrowUpRight className="text-xl text-white/30 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-300 shrink-0" />
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-white/60 max-w-[55ch]">
                        {project.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs uppercase tracking-wide text-white/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portofolio;
