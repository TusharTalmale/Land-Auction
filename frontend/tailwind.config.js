const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'logo': ['"Fredoka One"',]
    },
    extend: {
      width: {
        '18': '4.5rem'
      },
      outline: {
        grey: '1px solid #ebebeb', 
      },
      backgroundImage: {
        'homebg': "url('src/images/homeTop.jpeg')",
      },
      colors: {
        myGr: { dark: "#35825C", light: "#6ACF9D", disabled: "#CAEABF" },
        myPr: { dark: "#9540A6", light: "#B37ECF" },
        myAw: "#faf9fa",
        myRe: "#d62b36",
      },
      fontFamily: {
        myPtext: ['"Open Sans Condensed"', 'sans-serif'],
        myHtext: ['"Dosis"', 'sans-serif'] // Ensure fonts with spaces have " " surrounding it.
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [],
};
