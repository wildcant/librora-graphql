import cn from 'classnames'
import {ReactNode} from 'react'
import s from './Badge.module.css'

interface IBadgeProps {
  children: ReactNode | string
  className?: string
  color?: 'primary' | 'secondary'
  content?: ReactNode | string | number
  variant?: 'solid' | 'outline'
}

export function Badge({
  children,
  className,
  color = 'primary',
  content,
  variant = 'solid',
}: IBadgeProps) {
  const badgeClassName = cn(
    s.Badge,
    {
      [s.primary]: color === 'primary',
      [s.secondary]: color === 'secondary',
      [s.solid]: variant === 'solid',
      [s.outline]: variant === 'outline',
    },
    className,
  )

  return (
    <div className={s.Root}>
      {children}
      <span className={badgeClassName}>
        <span>{content}</span>
      </span>
    </div>
  )
}
