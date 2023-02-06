import { ComponentPropsWithoutRef, ReactElement } from 'react'
import * as Icons from './icons'

const dimension = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
}

export enum EIconName {
  arrowDown = 'arrow-down',
  arrowLeft = 'arrow-left',
  arrowRight = 'arrow-right',
  arrowUp = 'arrow-up',
  check = 'check',
  checkboxBlank = 'checkbox-blank',
  checkboxCircle = 'checkbox-circle',
  circleFilled = 'circle-filled',
  error = 'error',
  fallback = 'fallback',
  info = 'info',
  menu = 'menu',
  warning = 'warning',
  close = 'close',
  google = 'google',
  search = 'search',
  closeCircleFill = 'close-circle-fill',
}

const icon: { [key in EIconName]: ReactElement } = {
  'arrow-down': Icons.arrowDown,
  'arrow-left': Icons.arrowLeft,
  'arrow-right': Icons.arrowRight,
  'arrow-up': Icons.arrowUp,
  'checkbox-blank': Icons.checkboxBlank,
  'checkbox-circle': Icons.checkboxCircle,
  'circle-filled': Icons.circleFilled,
  check: Icons.check,
  error: Icons.error,
  fallback: Icons.fallback,
  info: Icons.info,
  menu: Icons.menu,
  warning: Icons.warning,
  close: Icons.close,
  google: Icons.google,
  search: Icons.search,
  'close-circle-fill': Icons.closeCircleFill,
}

export interface IIconProps extends ComponentPropsWithoutRef<'svg'> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  name: `${EIconName}`
}

export function Icon({ size = 'lg', name, ...props }: IIconProps) {
  const d = dimension[size]

  return (
    <svg viewBox="0 0 24 24" width={d} height={d} {...props}>
      {icon[name] ?? Icons.fallback}
    </svg>
  )
}
