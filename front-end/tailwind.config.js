/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000", // Pure black for Apple-style dark mode
        surface: "#1c1c1e", // Apple dark gray surface
        glass: "rgba(30, 30, 30, 0.6)",
        "glass-border": "rgba(255, 255, 255, 0.15)",
        primary: "#34d399", // Brighter green for dark mode
        secondary: "#a7f3d0",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
