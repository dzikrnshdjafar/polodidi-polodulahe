/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["default", "retro", "cyberpunk", "valentine", "aqua", "light", "dark"], // Tambahkan tema yang ingin digunakan
  },
}
