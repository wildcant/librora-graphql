import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import { BreadcrumbSeparator } from './BreadcrumbSeparator'

export type BreadcrumbItemProps = ComponentPropsWithoutRef<'li'> & {
  isLastChild?: boolean
}

export function BreadcrumbItem({ children, className, isLastChild, ...props }: BreadcrumbItemProps) {
  return (
    <li className={cn('flex flex-row items-center text-xs sm:text-sm md:text-md', className)} {...props}>
      {children}
      {!isLastChild && <BreadcrumbSeparator />}
    </li>
  )
}
