/* eslint-disable @typescript-eslint/no-var-requires */

const twColors = require('tailwindcss/colors')

const electricViolet = {
  50: '#fbf3ff',
  100: '#f5e3ff',
  200: '#edcdff',
  300: '#dfa5ff',
  400: '#cc6cff',
  500: '#b935ff',
  600: '#a80fff',
  700: '#9d00ff',
  800: '#7d06c3',
  900: '#67079c',
}

const citrineWhite = {
  50: '#fdf9ef',
  100: '#f8edcf',
  200: '#f3e0b5',
  300: '#eccb85',
  400: '#e3ab54',
  500: '#dc9333',
  600: '#ce7c28',
  700: '#ab6123',
  800: '#894d23',
  900: '#6f411f',
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../packages/ui/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '../../apps/**/*.{ts,tsx}'],
  theme: {
    height: (theme) => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    minHeight: (theme) => ({
      0: '0',
      ...theme('spacing'),
      full: '100%',
      screen: 'calc(var(--vh) * 100)',
    }),
    extend: {
      boxShadow: {
        btn: '5px 6px 0px',
      },
      fontFamily: {
        merienda: ['var(--font-merienda)'],
        roboto: ['var(--font-roboto-slab)'],
        plusjakartasans: ['var(--font-plus-jakarta-sans)'],
      },
      colors: {
        current: 'currentColor',
        primary: electricViolet,
        secondary: citrineWhite,
        success: {
          base: twColors.green[600],
          light: twColors.green[100],
        },
        warning: {
          base: twColors.amber[500],
          light: twColors.orange[200],
        },
        alert: {
          base: twColors.red[500],
          light: twColors.red[200],
        },
      },
      animation: {
        'spin-fast': 'spin 100ms linear infinite',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    /*
    // Just playing around with custom plugins.
    function ({ addBase, theme }) {
      function extractBreakpoints(screens) {
        return Object.keys(screens).reduce((vars, screenKey) => {
          const value = screens[screenKey]

          const newVars = { [`--screen-${screenKey}`]: value }

          return { ...vars, ...newVars }
        }, {})
      }

      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]

          const newVars =
            typeof value === 'string'
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)

          return { ...vars, ...newVars }
        }, {})
      }

      const root = { ...extractColorVars(theme('colors')), ...extractBreakpoints(theme('screens')) }

      addBase({
        ':root': root,
      })
    },
    */
  ],
}
