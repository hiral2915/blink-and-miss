import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#06080B",
          900: "#0B0F14", // main background
          850: "#0F151C",
          800: "#141C24", // surface / cards
          750: "#1B2430",
          700: "#222D3D", // borders
          600: "#323F52",
        },
        lime: {
          400: "#D4F98B",
          DEFAULT: "#C6F36B", // electric lime accent
          500: "#B4E850",
          600: "#93C527",
        },
        cricket: {
          wicket: "#FF4757",
          four: "#2ED573",
          six: "#C6F36B",
          dot: "#64748B",
          run: "#38BDF8",
          blue: "#1E40AF",
          gold: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "fadeIn": "fadeIn 0.25s ease-out both",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(198, 243, 107, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(198, 243, 107, 0.6)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
