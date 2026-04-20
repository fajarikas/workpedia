import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        honda: {
          red: "#E02B20",
          "red-dark": "#B01E15",
          "red-light": "#FF4438",
          "red-muted": "rgba(224,43,32,0.12)",
        },
      },
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
        "honda-glow": "0 0 32px rgba(224,43,32,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
