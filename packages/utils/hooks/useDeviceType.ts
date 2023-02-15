import { theme } from '@librora/theme'
import { useMediaQuery } from './useMediaQuery'

enum Breakpoints {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  '2xl' = '2xl',
}

export function useDeviceType() {
  const breakpoints = theme?.extend?.screens as { [key in Breakpoints]: string }
  const [isMobile] = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const [upToTablets] = useMediaQuery(`(max-width: ${breakpoints.lg})`)
  const [isTablet] = useMediaQuery(`(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.lg})`)
  const [isDesktop] = useMediaQuery(`(min-width: ${breakpoints.lg})`)

  return {
    isMobile,
    upToTablets,
    isTablet,
    isDesktop,
  }
}
