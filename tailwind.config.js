/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      container: {
        center: 'true',
        padding: '1rem',
      },
      spacing: {
        112: '28rem',
      } 
    },
  },
  plugins: [],
}