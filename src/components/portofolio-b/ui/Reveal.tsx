"use client";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  inViewOnce,
} from "@/features/portofolio-b/shared/motion";

/** Single element that fades up when scrolled into view. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const M = motion[as];
  return (
    <M variants={fadeUp} {...inViewOnce} className={className}>
      {children}
    </M>
  );
}

/** Parent that staggers `RevealItem` children into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const M = motion[as];
  return (
    <M variants={staggerContainer} {...inViewOnce} className={className}>
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const M = motion[as];
  return (
    <M variants={fadeUp} className={className}>
      {children}
    </M>
  );
}
