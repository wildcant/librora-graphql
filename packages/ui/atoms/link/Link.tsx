import cn from 'classnames'
import NextLink, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import s from './Link.module.css'

type ILinkProps = {
  // icon?: 'arrow' | 'chevron' // TODO
  children: ReactNode
  className?: string
  color?: 'primary' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  target?: string
  underline?: boolean // Applies only for link variant.
  variant?: 'default' | 'button' | 'button-outline' | 'unstyled'
} & (NextLinkProps | NativeLinkProps)

type NextLinkProps = {
  isExternal?: false
} & LinkProps

type NativeLinkProps = {
  isExternal?: true
  href: string
}

export function Link({
  children,
  className,
  color = 'primary',
  size = 'md',
  target,
  variant = 'default',
  isExternal = false,
  underline,
  ...props
}: ILinkProps) {
  const isBtn = variant?.includes('button')
  const isOutline = variant?.includes('outline')
  const unstyled = variant === 'unstyled'

  const linkClassName = cn(
    {
      [s.Link]: variant === 'default',
      [s.Button]: isBtn,
      [s.primary]: color === 'primary',
      [s.secondary]: color === 'secondary',
      [s.solid]: isBtn && !isOutline,
      [s.outline]: isBtn && isOutline,
      [s.xs]: size === 'xs' && !unstyled,
      [s.sm]: size === 'sm' && !unstyled,
      [s.md]: size === 'md' && !unstyled,
      [s.lg]: size === 'lg' && !unstyled,
      [s.underline]: underline,
    },
    className
  )

  return isExternal ? (
    <a className={linkClassName} href={props.href as string} target={target}>
      {children}
    </a>
  ) : (
    <NextLink className={linkClassName} target={target} {...props}>
      {children}
    </NextLink>
  )
}
