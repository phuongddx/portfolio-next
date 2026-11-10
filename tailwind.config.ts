import type { Config } from "tailwindcss";

// Every colour and size here points at a CSS custom property in src/app/globals.css.
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "var(--bg)",
        surface: "var(--surface)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        soft: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        field: {
          1: "var(--field-1)",
          2: "var(--field-2)",
          3: "var(--field-3)",
          4: "var(--field-4)",
        },
      },
      fontFamily: {
        text: ["var(--font-text)", "Times New Roman", "serif"],
      },
      fontSize: {
        small: ["var(--step-small)", { lineHeight: "1.45" }],
        body: ["var(--step-body)", { lineHeight: "1.5" }],
        head: ["var(--step-head)", { lineHeight: "1.1", letterSpacing: "-0.026em" }],
        display: ["var(--step-display)", { lineHeight: "1.05", letterSpacing: "-0.026em" }],
      },
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section-gap)",
      },
      maxWidth: {
        measure: "46ch",
      },
    },
  },
  plugins: [],
};
export default config;
