/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a192f',
          darker: '#071221',
          accent: '#112240',
        }
      }
    },
  },
  plugins: [],
}
