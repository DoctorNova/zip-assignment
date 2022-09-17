// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: [
    // ...
    './node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}', // path to vechaiui
    './src/*/.tsx',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line
  plugins: [require('@tailwindcss/forms'), require('@vechaiui/core')],
};
