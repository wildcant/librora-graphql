const { theme } = require('./dist/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../packages/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../apps/storefront/**/*.{ts,tsx}',
  ],
  theme,
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
}
