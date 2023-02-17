/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PT Sans', 'sans-serif'],
        custom: ['Shadows Into Light', 'cursive'],
      },
    },
  },
  plugins: [],
};
// font-family: 'Caveat', cursive;