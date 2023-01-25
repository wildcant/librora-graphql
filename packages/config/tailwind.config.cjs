const { theme } = require('./dist/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../packages/ui/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '../../apps/**/*.{ts,tsx}'],
  theme,
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')],
}
