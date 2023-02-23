import { Icon } from '@atoms'
import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<'span'> & {
  className?: string
}

export function BreadcrumbSeparator({ className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <span className={cn('mx-1', className)} {...props}>
      <Icon name="arrow-right" />
    </span>
  )
}
