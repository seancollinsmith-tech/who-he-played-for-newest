import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Arial Narrow", "Impact", "sans-serif"],
        mono: ["Courier New", "monospace"]
      },
      boxShadow: {
        card: "0 14px 30px rgba(13, 35, 61, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
