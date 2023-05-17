import * as scrollHide from 'tailwind-scrollbar-hide'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        loader: {
          "0%": { boxShadow: "-38px -12px ,  -14px 0,  14px 0, 38px 0" },
          "33%": { boxShadow: "-38px 0px, -14px -12px,  14px 0, 38px 0" },
          "66%": { boxShadow: "-38px 0px , -14px 0, 14px -12px, 38px 0" },
          "100%": { boxShadow: "-38px 0 , -14px 0, 14px 0 , 38px -12px" },
        }
      },
      animation: {
        loader: "loader 1s linear infinite alternate",
      }
    },
  },
  plugins: [
    scrollHide,
    forms
  ],
}

