const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      addUtilities({
        '.w-card-xs': {
          width: theme('spacing.16'),
        },
        '.w-card-sm': {
          width: theme('spacing.20'),
        },
        '.w-card-md': {
          width: theme('spacing.24'),
        },
        '.w-card-lg': {
          width: theme('spacing.36'),
        },
        '.w-card-xl': {
          width: theme('spacing.60'),
        }
      })
    }),
  ]
}
