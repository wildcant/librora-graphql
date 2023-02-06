import { ThemeConfig } from 'tailwindcss/types/config'

import config from './tailwind.config.cjs'

export type Theme =
  | Partial<
      ThemeConfig & {
        extend: Partial<ThemeConfig>
      }
    >
  | undefined

export const theme = config.theme as Theme
