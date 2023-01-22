import twColors from 'tailwindcss/colors'
import { Config } from 'tailwindcss'

export const theme: Config['theme'] = {
  extend: {
    colors: {
      current: 'currentColor',
      primary: {
        lightest: twColors.stone[50],
        lighter: twColors.stone[100],
        light: twColors.stone[200],
        base: twColors.stone[600],
        dark: twColors.stone[700],
        darker: twColors.stone[800],
        darkest: twColors.stone[900],
      },
      secondary: {
        lightest: twColors.emerald[50],
        lighter: twColors.emerald[100],
        light: twColors.emerald[200],
        base: twColors.emerald[600],
        dark: twColors.emerald[700],
        darker: twColors.emerald[800],
        darkest: twColors.emerald[900],
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
