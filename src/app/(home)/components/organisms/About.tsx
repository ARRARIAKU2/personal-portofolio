"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { fadeIn } from "@/app/(home)/components/variant";

const stats = [
  { end: 2, suffix: "+", label: "Years shipping production web apps" },
  { end: 8, suffix: "", label: "Companies & fellowship programs" },
  { end: 20, suffix: "+", label: "Certifications earned" },
];

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Nuxt.js",
  "Node.js",
  "Express.js",
  "Tailwind CSS",
  "Python",
  "MongoDB",
  "PostgreSQL",
];

function About() {
  return (
    <section id="about" className="min-h-dvh flex items-center py-24 lg:py-0">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Asymmetric 12-col split: content left-weighted, stats offset right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-8">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-7"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-accent">
              About me
            </span>
            <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none">
              I build interfaces
              <br />
              people actually enjoy.
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-white/70 max-w-[60ch]">
              I&apos;m M. Alana, a frontend developer grounded in JavaScript and
              Python. I&apos;ve developed real-time fleet tracking, enterprise
              audit systems, and biomedical computer-vision research — always
              putting user comfort first and moving fast inside a team.
            </p>

            <div className="mt-10 flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 text-sm rounded-md border border-white/15 text-white/75 transition-colors duration-300 hover:border-accent hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats as a divided list — no boxes, negative space does the grouping */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-5 lg:col-start-9 flex flex-col divide-y divide-white/10 border-t border-white/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="py-6 lg:py-8">
                <div className="text-5xl lg:text-6xl font-bold text-accent leading-none">
                  <CountUp end={stat.end} duration={3.5} enableScrollSpy />
                  {stat.suffix}
                </div>
                <div className="mt-2 text-sm uppercase tracking-wide text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
