import type { Variants, Transition } from "framer-motion";

/** Premium spring — weighty, no linear easing (taste-skill §4). */
export const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

/** Reveal a single element from below. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring },
};

/** Parent that staggers its children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Shared whileInView config — reveal once, slightly before fully on screen. */
export const inViewOnce = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-80px" },
} as const;
