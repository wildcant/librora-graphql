import { EIconName, Icon, Loader } from '@atoms'
import cn from 'classnames'
import { ComponentPropsWithoutRef, ReactElement } from 'react'
import s from './Button.module.css'

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  color?: 'primary' | 'secondary'
  icon?: ReactElement | `${EIconName}`
  iconClassName?: string
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  loadingText?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'unstyled' | 'solid' | 'outline' | 'ghost' | 'link'
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  children,
  className,
  color = 'primary',
  disabled,
  icon,
  iconClassName,
  iconPosition = 'left',
  isLoading,
  loadingText,
  size,
  variant = 'solid',
  ...props
}: ButtonProps) => {
  let iconElement = typeof icon === 'string' ? <Icon name={icon} size="lg" className={iconClassName} /> : icon

  if (isLoading) {
    iconElement = <Loader size={size} className={`${variant === 'solid' && 'text-white'}`} />
  }

  const unstyled = variant === 'unstyled'

  const buttonClassName = cn(
    s.Btn,
    {
      [s.primary]: color === 'primary' && !unstyled,
      [s.secondary]: color === 'secondary' && !unstyled,
      [s.solid]: variant === 'solid',
      [s.outline]: variant === 'outline',
      [s.ghost]: variant === 'ghost',
      [s.link]: variant === 'link',
      [s.animated]: variant !== 'link' && !unstyled && !isLoading,
      [s.xs]: size === 'xs' && !unstyled,
      [s.sm]: size === 'sm' && !unstyled,
      [s.md]: size === 'md' && !unstyled,
      [s.lg]: size === 'lg' && !unstyled,
      [s.responsive]: !size,
      [s['include-icon']]: iconElement && children,
      [s['icon-only']]: iconElement && !children,
    },
    className
  )

  return (
    <button type="button" className={buttonClassName} disabled={disabled || isLoading} {...props}>
      {iconPosition === 'left' && iconElement}
      {isLoading && loadingText ? loadingText : children}
      {/* <span className={s.Loading}>{}</span> // Elipsis animation, just in case I needed in the future. */}
      {iconPosition === 'right' && iconElement}
    </button>
  )
}
