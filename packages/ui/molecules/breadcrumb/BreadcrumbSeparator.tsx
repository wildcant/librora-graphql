import { Icon } from '@atoms'
import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

export interface IBreadcrumbSeparatorProps extends ComponentPropsWithoutRef<'span'> {
  className?: string
}

export function BreadcrumbSeparator({ className, ...props }: IBreadcrumbSeparatorProps) {
  return (
    <span className={cn('mx-1', className)} {...props}>
      <Icon name="arrow-right" />
    </span>
  )
}
