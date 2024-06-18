/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'max-sm': {'max': '640px'}, // @media (max-width: 640px) { ... }
      'max-md': {'max': '769px'}, // @media (max-width: 768px) { ... }
      'max-lg': {'max': '1024px'}, // @media (max-width: 1024px) { ... }
      'max-xl': {'max': '1280px'}, // @media (max-width: 1280px) { ... }
      'max-2xl': {'max': '1536px'}, // @media (max-width: 1536px) { ... }
      'max-3xl': {'max': '1736px'}, // @media (max-width: 1736px) { ... }
    },
  },
  plugins: [],
}