export const T = {
  bg: "#FAFAFA",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F5F5",
  border: "#EBEBEB",
  borderLight: "#F2F2F2",
  ink: "#111111",
  inkLight: "#1A1A1A",
  secondary: "#6B6B6B",
  tertiary: "#9E9E9E",
  faint: "#C8C8C8",
  green: "#006B3F",
  greenDark: "#005432",
  greenSoft: "rgba(0,107,63,0.07)",
  red: "#CE1126",
  gold: "#D4A017",
  goldSoft: "rgba(212,160,23,0.08)",
  white: "#FFFFFF",
  sGreen: "0 6px 24px rgba(0,107,63,0.20)",
  s1: "0 1px 3px rgba(0,0,0,0.04)",
  s2: "0 4px 16px rgba(0,0,0,0.05)",
  s3: "0 8px 30px rgba(0,0,0,0.07)",
  r: 20,
  rs: 14,
  rxs: 10,
} as const;

export const F = {
  serif: "var(--font-display)",
  sans: "var(--font-body)",
} as const;

export const SECTION = {
  directory: {
    color: "#CE1126",
    dark: "#A80E1F",
    soft: "rgba(206,17,38,0.07)",
    shadow: "0 6px 24px rgba(206,17,38,0.18)",
    label: "Directory",
  },
  events: {
    color: "#D4A017",
    dark: "#B8860B",
    soft: "rgba(212,160,23,0.07)",
    shadow: "0 6px 24px rgba(212,160,23,0.18)",
    label: "Events",
  },
  jobs: {
    color: "#006B3F",
    dark: "#005432",
    soft: "rgba(0,107,63,0.07)",
    shadow: "0 6px 24px rgba(0,107,63,0.18)",
    label: "Jobs",
  },
  marketplace: {
    color: "#1A1A1A",
    dark: "#111111",
    soft: "rgba(0,0,0,0.06)",
    shadow: "0 6px 24px rgba(0,0,0,0.15)",
    label: "High Commission",
  },
} as const;
