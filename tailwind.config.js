const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        sm: ["14px", { lineHeight: "18px", "@screen md": { fontSize: "20px", lineHeight: "20px" } }],
        base: ["16px", { lineHeight: "20px", "@screen md": { fontSize: "24px", lineHeight: "24px" } }],
        lg: ["18px", { lineHeight: "22px", "@screen md": { fontSize: "28px", lineHeight: "28px" } }],
        xl: ["20px", { lineHeight: "24px", "@screen md": { fontSize: "36px", lineHeight: "32px" } }],
        "2xl": ["24px", { lineHeight: "28px", "@screen md": { fontSize: "48px", lineHeight: "48px" } }],
      },
      colors: {
        glass: {
          'bg': 'rgba(20, 20, 40, 0.85)',
          'bg-light': 'rgba(255, 100, 100, 0.12)',
          'border': 'rgba(255, 100, 100, 0.3)',
          'border-light': 'rgba(255, 100, 100, 0.5)',
          'hover': 'rgba(255, 100, 100, 0.18)',
        },
        accent: {
          gold: {
            DEFAULT: '#ffd700',
            light: '#ffeb3b',
            glow: 'rgba(255, 215, 0, 0.5)',
          },
          green: {
            DEFAULT: '#4caf50',
            dark: '#2e7d32',
            light: '#81c784',
            glow: 'rgba(76, 175, 80, 0.4)',
          },
          red: {
            DEFAULT: '#ff4444',
            dark: '#cc0000',
            light: '#ff6666',
            glow: 'rgba(255, 68, 68, 0.4)',
          },
          snow: {
            DEFAULT: '#ffffff',
            glow: 'rgba(255, 255, 255, 0.4)',
          },
        },
        status: {
          success: '#4caf50',
          warning: '#ffd700',
          error: '#ff4444',
          info: '#ffeb3b',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
