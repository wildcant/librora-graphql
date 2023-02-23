import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import s from './Divider.module.css'

export type DividerProps = ComponentPropsWithoutRef<'div'> & {
  isVertical?: boolean
}

export function Divider({ children, className, isVertical, ...props }: DividerProps) {
  return (
    <div
      className={cn({ [s.HorizontalDivider]: !isVertical, [s.VerticalDivider]: isVertical }, className)}
      {...props}
    >
      {children}
    </div>
  )
}
