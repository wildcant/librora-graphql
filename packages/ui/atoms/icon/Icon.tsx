import { ComponentPropsWithoutRef, ReactElement } from 'react'
import { fallback, check, arrowDown, arrowUp, circleFilled, arrowLeft, arrowRight, menu } from './icons'

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
  circleFilled = 'circle-filled',
  fallback = 'fallback',
  menu = 'menu',
}

const icon: { [key in EIconName]: ReactElement } = {
  fallback,
  check,
  'arrow-down': arrowDown,
  'arrow-left': arrowLeft,
  'arrow-right': arrowRight,
  'arrow-up': arrowUp,
  'circle-filled': circleFilled,
  menu,
}

interface IIconProps extends ComponentPropsWithoutRef<'svg'> {
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
