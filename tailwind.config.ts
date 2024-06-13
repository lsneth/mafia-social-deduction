/** @type {import('tailwindcss').Config} */
const colors = require('./constants/colors')

module.exports = {
  content: ['./app/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
