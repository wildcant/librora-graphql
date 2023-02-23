import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

type LogoProps = ComponentPropsWithoutRef<'h5'>
export function Logo({ className, ...props }: LogoProps) {
  return (
    <h5 className={cn('font-merienda text-primary-900 text-[26px] font-bold', className)} {...props}>
      Librora
    </h5>
  )
}
