/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/assets/flowbite.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  }, plugins: [require('flowbite/plugin')],
}
