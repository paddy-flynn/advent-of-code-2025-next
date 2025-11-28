const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        sm: ["20px", "20px"],
        base: ["24px", "24px"],
        lg: ["28px", "28px"],
        xl: ["36px", "32px"],
        "2xl": ["48px", "48px"],
      },
      colors: {
        // Glass system with warm Christmas tones
        glass: {
          'bg': 'rgba(15, 35, 30, 0.75)',
          'bg-light': 'rgba(212, 175, 55, 0.08)',
          'border': 'rgba(212, 175, 55, 0.2)',
          'border-light': 'rgba(212, 175, 55, 0.35)',
          'hover': 'rgba(212, 175, 55, 0.12)',
        },
        // Christmas accent colors
        accent: {
          gold: {
            DEFAULT: '#d4af37',
            light: '#f4d03f',
            glow: 'rgba(212, 175, 55, 0.4)',
          },
          green: {
            DEFAULT: '#1a5c47',
            dark: '#0f4c3a',
            light: '#2d7a5f',
            glow: 'rgba(26, 92, 71, 0.3)',
          },
          red: {
            DEFAULT: '#a52a4a',
            dark: '#8b1e3f',
            light: '#c73e5d',
            glow: 'rgba(165, 42, 74, 0.3)',
          },
          snow: {
            DEFAULT: '#f0f8ff',
            glow: 'rgba(240, 248, 255, 0.3)',
          },
        },
        // Christmas-themed status colors
        status: {
          success: '#2d7a5f',
          warning: '#d4af37',
          error: '#a52a4a',
          info: '#f4d03f',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
