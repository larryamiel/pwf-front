/** @type {import('tailwindcss').Config} */
const { colors } = require('tailwindcss/defaultTheme')

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3f3d56',
        secondary: '#ff3945'
      }
    },
  },
  plugins: [],
}
