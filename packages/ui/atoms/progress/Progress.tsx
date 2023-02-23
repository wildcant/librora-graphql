import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import s from './Progress.module.css'

type ProgressProps = ComponentPropsWithoutRef<'progress'>

export function Progress({ className, ...props }: ProgressProps) {
  return <progress className={cn(s.Progress, s.primary, className)} {...props} />
}
