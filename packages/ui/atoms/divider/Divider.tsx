import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import s from './Divider.module.css'

export interface IDividerProps extends ComponentPropsWithoutRef<'div'> {}

export function Divider({ children, className, ...props }: IDividerProps) {
  return (
    <div className={cn(s.Divider, className)} {...props}>
      {children}
    </div>
  )
}
