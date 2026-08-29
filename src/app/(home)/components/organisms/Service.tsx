"use client";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { fadeIn } from "@/app/(home)/components/variant";

interface ServiceItem {
  no: string;
  title: string;
  description: string;
  tags: string[];
}

const services: ServiceItem[] = [
  {
    no: "01",
    title: "Frontend Engineering",
    description:
      "Responsive, accessible interfaces in React, Next.js and Nuxt.js — from live maps and dashboards to enterprise audit modules that stay fast under load.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    no: "02",
    title: "Fullstack Delivery",
    description:
      "End-to-end features with Node.js, Express and MongoDB. REST integration through Axios & SWR: fetching, mutations, validation and clean error handling.",
    tags: ["Node.js", "Express", "SWR"],
  },
  {
    no: "03",
    title: "AI & Computer Vision",
    description:
      "Instance segmentation research with YOLACT, YOLOv7 and YOLOv8 — data pipelines, labeling and model training on biomedical imaging.",
    tags: ["YOLACT", "YOLOv8", "Python"],
  },
];

function Service() {
  return (
    <section id="service" className="min-h-[100dvh] flex items-center py-24">
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
                What I do
              </span>
              <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none">
                Services
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/60 max-w-[40ch]">
                Three ways I help teams turn ideas into products that ship.
              </p>
            </div>
          </motion.div>

          {/* Divided list replaces the 3-card row */}
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col divide-y divide-white/10 border-t border-white/10">
            {services.map((service, index) => (
              <motion.div
                key={service.no}
                variants={fadeIn("up", 0.2 + index * 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
                className="group py-8 lg:py-10 transition-colors duration-300"
              >
                <div className="flex items-start gap-6">
                  <span className="text-lg text-white/30 group-hover:text-accent transition-colors duration-300 pt-1">
                    {service.no}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <HiArrowUpRight className="text-xl text-white/30 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-300 shrink-0" />
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-white/60 max-w-[55ch]">
                      {service.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
