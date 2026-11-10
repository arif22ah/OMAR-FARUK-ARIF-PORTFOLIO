import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        slate: {
          850: "#131c2e",
          900: "#0f172a",
          950: "#070b14",
        },
      },
    },
  },
  plugins: [],
};
export default config;
