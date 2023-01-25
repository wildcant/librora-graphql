import cn from 'classnames'
import { ReactNode } from 'react'
import s from './Link.module.css'

interface ILinkProps {
  href?: string
  className?: string
  activeClassName?: string
  underline?: boolean
  tabIndex?: number
  title?: string
  target?: string
  variant?:
    | 'default'
    | 'button'
    | 'button-outline'
    | 'button-secondary'
    | 'button-secondary-outline'
    | 'unstyled'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  // icon?: 'arrow' | 'chevron'
  onMouseOver?: React.MouseEventHandler<HTMLAnchorElement>
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}

export function Link({ target, href, variant = 'default', size = 'md', children }: ILinkProps) {
  const isBtn = variant?.includes('button')
  const isSecondary = variant?.includes('secondary')
  const isOutline = variant?.includes('outline')
  const unstyled = variant === 'unstyled'

  const linkClassName = cn({
    [s.Link]: variant === 'default',
    [s.Button]: isBtn,
    [s.primary]: isBtn && !isSecondary,
    [s.secondary]: isBtn && isSecondary,
    [s.solid]: isBtn && !isOutline,
    [s.outline]: isBtn && isOutline,
    [s.xs]: size === 'xs' && !unstyled,
    [s.sm]: size === 'sm' && !unstyled,
    [s.md]: size === 'md' && !unstyled,
    [s.lg]: size === 'lg' && !unstyled,
  })

  return (
    <a className={linkClassName} href={href} target={target}>
      {children}
    </a>
  )
}
