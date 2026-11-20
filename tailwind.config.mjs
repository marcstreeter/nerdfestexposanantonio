/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      gray: colors.gray,
      indigo: colors.indigo,
      neutral: colors.neutral, // Used mainly for text color
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        400: "#facc15",
        500: "#eab308",
      }, // Accent colors, used mainly for star color, heading and buttons
      orange: {
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fb713b",
        400: "#fa5a15",
        500: "#e14d0b",
        600: "#ea580c",
      }, // Primary colors, used mainly for links, buttons and svg icons
      red: colors.red, // Used for bookmark icon
      zinc: colors.zinc, // Used mainly for box-shadow
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        background: "var(--page)",
        foreground: "var(--text)",
        border: "var(--line)",
        input: "var(--ui-field-border)",
        ring: "var(--accent)",
        primary: { DEFAULT: "var(--accent)", foreground: "var(--on-accent)" },
        secondary: { DEFAULT: "var(--surface)", foreground: "var(--text)" },
        muted: { DEFAULT: "var(--surface)", foreground: "var(--muted)" },
        accent: { DEFAULT: "var(--ui-highlight)", foreground: "var(--text)" },
        popover: { DEFAULT: "var(--surface)", foreground: "var(--text)" },
        card: { DEFAULT: "var(--surface)", foreground: "var(--text)" },
        destructive: {
          DEFAULT: "var(--ui-destructive)",
          foreground: "var(--ui-on-destructive)",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};
