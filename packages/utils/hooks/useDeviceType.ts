// import { theme } from '@librora/theme'
import { useMediaQuery } from './useMediaQuery'

// TODO: Fix import issue (Currently happening in docs)
// SyntaxError: The requested module 'theme/tailwind.config.cjs?import' does not provide an export named 'default'
// Otherwise we must keep the following screen breakpoints consistent with theme.
const theme = {
  extend: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
}

enum Breakpoints {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

export function useDeviceType() {
  const breakpoints = theme?.extend?.screens as { [key in Breakpoints]: string }

  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const upToTablets = useMediaQuery(`(max-width: ${breakpoints.lg})`)
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg})`)
  const isDesktop = useMediaQuery(`(min-width: ${breakpoints.lg})`)

  return {
    isMobile,
    upToTablets,
    isTablet,
    isDesktop,
  }
}
