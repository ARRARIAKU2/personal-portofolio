import clsx, { type ClassValue } from "clsx";

// Tiny className helper. tailwind-merge intentionally omitted — variants here
// don't produce conflicting utilities. Add tw-merge if that changes.
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
