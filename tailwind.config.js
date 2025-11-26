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
        // Glass system
        glass: {
          'bg': 'rgba(17, 25, 40, 0.75)',
          'bg-light': 'rgba(255, 255, 255, 0.05)',
          'border': 'rgba(255, 255, 255, 0.1)',
          'border-light': 'rgba(255, 255, 255, 0.18)',
          'hover': 'rgba(255, 255, 255, 0.05)',
        },
        // Accent colors
        accent: {
          cyan: {
            DEFAULT: '#00d4ff',
            glow: 'rgba(0, 212, 255, 0.3)',
          },
          purple: {
            DEFAULT: '#a855f7',
            glow: 'rgba(168, 85, 247, 0.3)',
          },
          green: {
            DEFAULT: '#10b981',
            glow: 'rgba(16, 185, 129, 0.3)',
          },
        },
        // Status colors (vibrant versions)
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#06b6d4',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
