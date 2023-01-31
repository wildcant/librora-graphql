import { Config } from 'tailwindcss'
import twColors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

// Generated using https://uicolors.app/create

const electricViolet = {
  '50': '#fbf3ff',
  '100': '#f5e3ff',
  '200': '#edcdff',
  '300': '#dfa5ff',
  '400': '#cc6cff',
  '500': '#b935ff',
  '600': '#a80fff',
  '700': '#9d00ff',
  '800': '#7d06c3',
  '900': '#67079c',
}

const citrineWhite = {
  '50': '#fdf9ef',
  '100': '#f8edcf',
  '200': '#f3e0b5',
  '300': '#eccb85',
  '400': '#e3ab54',
  '500': '#dc9333',
  '600': '#ce7c28',
  '700': '#ab6123',
  '800': '#894d23',
  '900': '#6f411f',
}

export const theme: Config['theme'] = {
  extend: {
    boxShadow: {
      btn: '5px 6px 0px',
    },
    fontFamily: {
      merienda: ['var(--font-merienda)'],
      sans: ['var(--font-roboto)', ...fontFamily.sans],
    },
    colors: {
      current: 'currentColor',
      primary: {
        lightest: electricViolet[50],
        lighter: electricViolet[100],
        light: electricViolet[200],
        base: electricViolet[600],
        dark: electricViolet[700],
        darker: electricViolet[800],
        darkest: electricViolet[900],
      },

      secondary: {
        lightest: citrineWhite[50],
        lighter: citrineWhite[100],
        light: citrineWhite[200],
        base: citrineWhite[600],
        dark: citrineWhite[700],
        darker: citrineWhite[800],
        darkest: citrineWhite[900],
      },
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
  },
}
