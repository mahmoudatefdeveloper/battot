/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFB5D8',
          DEFAULT: '#FF8DC7',
          dark: '#FF69B4',
        },
        secondary: {
          light: '#FFF4B8',
          DEFAULT: '#FFE566',
          dark: '#FFD700',
        },
      },
    },
  },
  plugins: [],
};