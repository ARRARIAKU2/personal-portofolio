"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { fadeIn } from "@/app/(home)/components/variant";

const EMAIL = "alanakocak62@gmail.com";

const details = [
  { icon: <FaEnvelope />, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    value: "+62 812-7353-2695",
    href: "https://wa.me/6281273532695",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Palembang, South Sumatera",
    href: null,
  },
];

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const inputBase =
  "bg-transparent border-b py-3 outline-none transition-colors placeholder:text-white/30 focus:border-accent";

function Contact() {
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell me your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (message.length < 10)
      next.message = "A little more detail helps (10+ characters).";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="min-h-[100dvh] flex items-center py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-8">
          {/* Left: intro + channels, asymmetric weight */}
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className="lg:col-span-5"
          >
            <span className="text-sm uppercase tracking-[0.3em] text-accent">
              Get in touch
            </span>
            <h2 className="mt-5 text-4xl md:text-6xl tracking-tighter leading-none">
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/60 max-w-[40ch]">
              Have a project in mind, or just want to say hi? Send a note and
              I&apos;ll reply within a day.
            </p>

            <div className="mt-10 flex flex-col divide-y divide-white/10 border-t border-white/10">
              {details.map((item) => {
                const inner = (
                  <div className="flex items-center gap-4 py-4">
                    <span className="text-lg text-accent w-6 shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-white/40">
                        {item.label}
                      </div>
                      <div className="text-base text-white/90">{item.value}</div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="transition-colors hover:text-accent"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: form — labels above inputs, inline errors, tactile submit */}
          <motion.form
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm text-white/60">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="M. Alana"
                aria-invalid={!!errors.name}
                className={`${inputBase} ${
                  errors.name ? "border-red-400" : "border-white/20"
                }`}
              />
              {errors.name && (
                <span className="text-sm text-red-400">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-white/60">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
                className={`${inputBase} ${
                  errors.email ? "border-red-400" : "border-white/20"
                }`}
              />
              {errors.email && (
                <span className="text-sm text-red-400">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm text-white/60">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                aria-invalid={!!errors.message}
                className={`${inputBase} resize-none ${
                  errors.message ? "border-red-400" : "border-white/20"
                }`}
              />
              {errors.message && (
                <span className="text-sm text-red-400">{errors.message}</span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-lg self-start active:translate-y-px"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
