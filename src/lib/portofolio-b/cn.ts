import { clsx, type ClassValue } from "clsx";

/** Tailwind-friendly className joiner (same pattern as portofolio-a/cn). */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
