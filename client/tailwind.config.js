/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: 'rgb(45, 218, 218)',
        customGreen: 'rgb(0, 255, 0)',
      },
      fontFamily: {
        custom: ['Roboto','sans-serif'],
        heading: ['Poppins','sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        dancing: ['Dancing Script', 'cursive'],
        lobster: ['Lobster', 'cursive'],
        opensans: ['Open Sans', 'sans-serif'],
        kolor:['Proxima Nova']
      }
    },
  },
  variants: {},
  plugins: [],
};

