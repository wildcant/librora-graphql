import { ILinkProps, Link } from '@atoms'
import cn from 'classnames'

export type BreadcrumbItemProps = ILinkProps & {
  className?: string
  isLastChild?: boolean
}

export function BreadcrumbLink({ className, children, ...props }: BreadcrumbItemProps) {
  return (
    <Link className={cn('hover:underline', className)} variant="unstyled" {...props}>
      {children}
    </Link>
  )
}
