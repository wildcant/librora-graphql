import { ComponentPropsWithoutRef, ReactElement } from 'react'
import {
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  check,
  checkboxBlank,
  checkboxCircle,
  circleFilled,
  error,
  fallback,
  info,
  menu,
  warning,
  close,
  google,
} from './icons'

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
}

const icon: { [key in EIconName]: ReactElement } = {
  'arrow-down': arrowDown,
  'arrow-left': arrowLeft,
  'arrow-right': arrowRight,
  'arrow-up': arrowUp,
  'checkbox-blank': checkboxBlank,
  'checkbox-circle': checkboxCircle,
  'circle-filled': circleFilled,
  check,
  error,
  fallback,
  info,
  menu,
  warning,
  close,
  google,
}

export interface IIconProps extends ComponentPropsWithoutRef<'svg'> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  name: `${EIconName}`
}

export function Icon({ size = 'lg', name, ...props }: IIconProps) {
  const d = dimension[size]

  return (
    <svg viewBox="0 0 24 24" width={d} height={d} {...props}>
      {icon[name] ?? fallback}
    </svg>
  )
}
