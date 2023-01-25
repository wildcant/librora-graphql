import twColors from 'tailwindcss/colors'
import { Config } from 'tailwindcss'

export const theme: Config['theme'] = {
  extend: {
    boxShadow: {
      btn: '5px 6px 0px',
    },
    colors: {
      current: 'currentColor',
      primary: {
        lightest: twColors.blue[50],
        lighter: twColors.blue[100],
        light: twColors.blue[200],
        base: twColors.blue[600],
        dark: twColors.blue[700],
        darker: twColors.blue[800],
        darkest: twColors.blue[900],
      },
      secondary: {
        lightest: twColors.orange[50],
        lighter: twColors.orange[100],
        light: twColors.orange[200],
        base: twColors.orange[600],
        dark: twColors.orange[700],
        darker: twColors.orange[800],
        darkest: twColors.orange[900],
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
