import { ReactNode } from 'react'
import cn from 'classnames'
import s from './Chip.module.css'

interface IPillProps {
  children: ReactNode
  variant?: 'solid' | 'plain' | 'outline' | 'ghost'
  color?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Chip({ children, variant = 'solid', color = 'primary', size = 'sm', className }: IPillProps) {
  const chipClassName = cn(
    s.Chip,
    {
      [s.primary]: color === 'primary',
      [s.secondary]: color === 'secondary',
      [s.solid]: variant === 'solid',
      [s.plain]: variant === 'plain',
      [s.outline]: variant === 'outline',
      [s.ghost]: variant === 'ghost',
      [s.xs]: size === 'xs',
      [s.sm]: size === 'sm',
      [s.md]: size === 'md',
      [s.lg]: size === 'lg',
    },
    className
  )

  return (
    <div className={chipClassName}>
      <span>{children}</span>
    </div>
  )
}
