"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/app/(home)/components/variant";

interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
}

const jobs: Job[] = [
  {
    company: "Lacak.io — PT. Lacak Cipta Aktual",
    role: "Frontend Developer",
    period: "2026 Aug — Now",
    location: "Remote",
    highlights: [
      "Refactored real-time vehicle monitoring, the Command Center dashboard and Leaflet map controls for smoother live fleet tracking.",
      "Created reporting & alerting with filtering, export, crash-detection and remote engine on/off in the Hardware Manager.",
      "Built end-to-end trip-compliance reporting with tracker selection, validation and live report-status tracking.",
    ],
    stack: ["React", "Leaflet", "Real-time"],
  },
  {
    company: "PT. Bank Sinarmas Tbk.",
    role: "Frontend Developer",
    period: "2026 Mar — Now",
    location: "Tangerang Selatan",
    highlights: [
      "Built an enterprise Internal Audit Management System: audit teams, planning, project management and org structures.",
      "Integrated REST APIs with Axios & SWR — search, filtering, pagination, mandays calculations and audit visualizations.",
      "Hardened quality with Formik/Yup, Sentry & Elastic APM monitoring and Jest/Testing Library tests.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    company: "Prestisa",
    role: "Fullstack Developer",
    period: "2025 Jan — 2025 May",
    location: "Remote",
    highlights: [
      "Frontend lead on an HRIS project, coordinating with the User, Head IT and Project Manager.",
      "Built the frontend in React and the backend in Express.js.",
    ],
    stack: ["React", "Express.js"],
  },
  {
    company: "PT. Sinergi Merah Putih",
    role: "Frontend Developer",
    period: "2024 Nov — 2025 Feb",
    location: "Remote",
    highlights: [
      "Implemented 70% of the UI design in Next.js for an HRIS product.",
      "Added mobile-responsive layouts for Management Data and Reimburse pages.",
    ],
    stack: ["Next.js", "Responsive"],
  },
  {
    company: "Chup Online Sdn Bhd",
    role: "Frontend Developer",
    period: "2024 May - 2024 Jun",
    location: "Remote",
    highlights: [
      "Developed the Chup Clinic hospital management app in Nuxt.js.",
      "Built Dashboard, Order flows, Payment, Live Queue, Analytics and Mobile Live Queue pages.",
    ],
    stack: ["Nuxt.js"],
  },
  {
    company: "PT. Bank Rakyat Indonesia (Persero) Tbk.",
    role: "Frontend Developer",
    period: "2023 May — 2023 Jul",
    location: "Jakarta Selatan",
    highlights: [
      "Selected 1 of 75 from 2,886 applicants for the BRI x Satkomindo IT Bootcamp.",
      "Built a TRO Portal front-end and audit-monitoring page in React with the backend team.",
    ],
    stack: ["React", "JavaScript"],
  },
];

function Work() {
  return (
    <section id="work" className="min-h-[100dvh] flex items-center py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-6 lg:mb-20"
        >
          {/* <span className="text-sm uppercase tracking-[0.3em] text-accent">
            Experience
          </span>
          <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none max-w-[16ch]">
            Where I&apos;ve shipped
          </h2> */}
          <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none max-w-[16ch]">
            Experience
          </h2>
        </motion.div>

        {/* Timeline as a divided list — border rows, not boxed cards */}
        <div className="flex flex-col border-t border-white/10">
          {jobs.map((job, index) => (
            <motion.article
              key={job.company}
              variants={fadeIn("up", 0.15 + (index % 3) * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-8 py-6 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="lg:col-span-3">
                <div className="text-sm text-accent">{job.period}</div>
                <div className="mt-1 text-sm text-white/50">{job.location}</div>
              </div>

              <div className="lg:col-span-9">
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                  {job.role}
                </h3>
                <div className="mt-1 text-base text-white/60">
                  {job.company}
                </div>

                <ul className="mt-5 space-y-3 border-l border-white/10 pl-5">
                  {job.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="relative text-sm lg:text-base text-white/70 leading-relaxed"
                    >
                      <span className="absolute -left-[21px] top-2.5 h-1.5 w-1.5 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs uppercase tracking-wide text-white/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
