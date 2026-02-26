import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "var(--text)",
        border: "var(--border)",
        card: "var(--card)",
        cta: "#2563EB",
        "accent-pink": "var(--accent-pink)",
        "accent-blue": "var(--accent-blue)",
        "accent-purple": "var(--accent-purple)",
        "accent-green": "var(--accent-green)",
        "accent-lime": "var(--accent-lime)",
        "accent-coral": "var(--accent-coral)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        navbar: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        hover: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        brutal: "4px 4px 0 0 rgba(31, 41, 55, 1)",
        "brutal-sm": "2px 2px 0 0 rgba(31, 41, 55, 1)",
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
