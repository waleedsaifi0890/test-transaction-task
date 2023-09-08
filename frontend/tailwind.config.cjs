/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  media: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1450px',
      },
    },
    extend: {
      colors: {
        'true-gray': colors.neutral,
      },
      fontFamily: {
        // sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        sans: ['Inter, sans-serif', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        11: '3.5rem',
        12: '5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  experimental: {
    applyComplexClasses: true,
  },
};
