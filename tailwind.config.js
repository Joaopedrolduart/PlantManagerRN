const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/screens/*.tsx',
    './src/components/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#C4C4CC',
          900: '121214',
        },
        green: {
          500: '#015F43',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
    fontFamily: ['Poppins', 'sans-serif'],
  },
  plugins: [],
};
