/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0066cc',
          dark: '#004c99',
        },
        secondary: {
          light: '#8c66ff',
          DEFAULT: '#6633ff',
          dark: '#4d1aff',
        },
      },
    },
  },
  plugins: [],
} 