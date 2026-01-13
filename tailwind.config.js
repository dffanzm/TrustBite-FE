/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // 1. SETUP FONT GLOBAL
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      // 2. SETUP WARNA CUSTOM
      colors: {
        primary: "#10B981", // Emerald
        dark: "#111827", // Gray-900
        light: "#F9FAFB", // Gray-50
      },
    },
  },
  plugins: [],
};
