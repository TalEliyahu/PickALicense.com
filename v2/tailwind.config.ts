import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./apps/web/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        paper: "#f8f5ef",
        line: "#d8d0c4",
        cobalt: "#2454d6",
        signal: "#2f7d58",
        caution: "#a15c16"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
} satisfies Config;
