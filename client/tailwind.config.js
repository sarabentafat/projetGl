/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {   
     screens: {
    'sm': '0px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
  },
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}