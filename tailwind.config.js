/** @type {import('tailwindcss').Config} */

// Lets a CSS-variable-backed color still support Tailwind opacity modifiers
// like `bg-paper/60` (Tailwind's usual trick: store the variable as raw RGB
// channels, not a hex string, then wrap it in rgb(... / <alpha-value>)).
function withOpacity(varName) {
  return ({ opacityValue }) =>
    opacityValue !== undefined ? `rgb(var(${varName}) / ${opacityValue})` : `rgb(var(${varName}))`;
}

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // `ink` stays a fixed literal navy on purpose: it's used for the
        // site's intentionally-always-dark blocks (footer, CTA banners, the
        // hero dashboard card, the admin sidebar, primary buttons) which
        // should look the same regardless of the visitor's light/dark
        // preference. Everything that SHOULD flip with the theme uses the
        // CSS-variable-backed tokens below instead (defined in index.css).
        ink: {
          DEFAULT: "#10141F",
          800: "#161B29",
          700: "#1E2436",
        },
        paper: withOpacity("--c-bg-rgb"),
        surface: withOpacity("--c-surface-rgb"),
        fg: withOpacity("--c-fg-rgb"),
        muted: withOpacity("--c-muted-rgb"),
        line: withOpacity("--c-line-rgb"),
        accent: {
          DEFAULT: "#E5A93D",
          light: "#F4CE8A",
          dark: "#B9821F",
        },
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,20,31,0.04), 0 8px 24px -12px rgba(16,20,31,0.12)",
        lift: "0 20px 45px -20px rgba(16,20,31,0.35)",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};
