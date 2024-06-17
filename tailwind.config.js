/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px', // Custom small breakpoint
        md: '720px', // Custom medium breakpoint
        lg: '960px',
        xl: '1280px',
       
      },
    },
  },
  plugins: [],
}