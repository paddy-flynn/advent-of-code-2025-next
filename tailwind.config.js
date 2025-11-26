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
        vscode: ["Consolas", "Monaco", "Menlo", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        sm: ["20px", "20px"],
        base: ["24px", "24px"],
        lg: ["28px", "28px"],
        xl: ["36px", "32px"],
        "2xl": ["48px", "48px"],
      },
      colors: {
        vscode: {
          // Backgrounds
          'editor-bg': '#1e1e1e',
          'sidebar-bg': '#252526',
          'panel-bg': '#2d2d30',
          'input-bg': '#3c3c3c',

          // Text
          'text-primary': '#d4d4d4',
          'text-secondary': '#858585',
          'text-muted': '#6a6a6a',

          // Accents
          'blue': '#007acc',
          'blue-hover': '#1a8cd8',
          'blue-light': '#0098ff',

          // Status colors
          'success': '#89d185',
          'warning': '#cca700',
          'error': '#f48771',

          // Borders
          'border': '#3e3e42',
          'border-light': '#454545',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
