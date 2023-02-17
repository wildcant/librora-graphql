import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import s from './Progress.module.css'

interface IProgressProps extends ComponentPropsWithoutRef<'progress'> {}

export function Progress({ className, ...props }: IProgressProps) {
  return <progress className={cn(s.Progress, s.primary, className)} {...props} />
}
