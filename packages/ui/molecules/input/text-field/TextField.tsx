import cn from 'classnames'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './TextField.module.css'

type ColorScheme = 'white' | 'bg-secondary-lightest'
export interface ITextFieldProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'disabled' | 'type'> {
  label?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  colorScheme?: ColorScheme
}

const colorSchemeMapping: { [key in ColorScheme]: string } = {
  'bg-secondary-lightest': '#fdf9ef',
  white: 'white',
}

export function TextField<TValues extends FieldValues>({
  className,
  control,
  defaultValue,
  label,
  leftIcon,
  name,
  rightIcon,
  rules,
  colorScheme = 'white',
  ...props
}: ITextFieldProps<TValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  const inputClassName = cn(s.Input, {
    [s.valid]: !error,
    [s.error]: !!error,
    [s.disabled]: props.disabled,
    [s.withIconLeft]: !!leftIcon,
    [s.withIconRight]: !!rightIcon,
  })

  const colorSchemeStyle = { '--colorScheme': colorSchemeMapping[colorScheme] } as React.CSSProperties

  return (
    <div className={cn(s.Container, className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(s.Label, {
            [s.disabled]: props.disabled,
            [s.displayLabelTop]: !!field.value,
            [s.withIconLeft]: !!leftIcon,
            [s.withIconRight]: !!rightIcon,
            [s.error]: !!error,
            [s.valid]: !error,
          })}
          style={colorSchemeStyle}
        >
          {label}
        </label>
      )}

      <div className={cn(s.InputContainer, { [s.disabled]: props.disabled })}>
        {leftIcon && <div className={s.LeftIcon}>{leftIcon}</div>}

        <input
          id={name}
          type="text"
          className={inputClassName}
          {...props}
          {...field}
          style={colorSchemeStyle}
        />

        {rightIcon && <div className={s.RightIcon}>{rightIcon}</div>}
      </div>

      {error && <span className="text-sm text-red-500 ">{error.message || 'This field is required.'}</span>}
    </div>
  )
}
