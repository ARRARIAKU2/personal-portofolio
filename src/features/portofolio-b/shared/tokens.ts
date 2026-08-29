/**
 * ARK Design — brand tokens (brass-amber + charcoal).
 * CSS custom props live under `.ark` in globals.css; these mirror them for TS use
 * (e.g. framer-motion colors, chart fills). Keep the two in sync.
 */
export const arkTokens = {
  bg: "#F7F5F0", // bone
  surface: "#FFFFFF",
  ink: "#17181A", // charcoal (near-black, never #000)
  gray: "#6B6F76", // concrete
  line: "#E2DFD8", // hairline
  accent: "#C79A3A", // brass-amber
  accentInk: "#8A6A1E", // darker brass for text-on-light contrast
} as const;

export type ArkToken = keyof typeof arkTokens;
