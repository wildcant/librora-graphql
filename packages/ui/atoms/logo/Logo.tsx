import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

interface ILogoProps extends ComponentPropsWithoutRef<'h5'> {}
export function Logo({ className, ...props }: ILogoProps) {
  return (
    <h5 className={cn('font-merienda text-primary-900 text-2xl font-semibold', className)} {...props}>
      Librora
    </h5>
  )
}
