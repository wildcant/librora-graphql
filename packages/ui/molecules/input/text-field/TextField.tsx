import cn from 'classnames'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './TextField.module.css'

export interface ITextFieldProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'placeholder' | 'disabled' | 'type'> {
  label?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
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

  const inputClassName = cn(
    s.Input,
    { [s.error]: s.error, [s.disabled]: props.disabled, 'pl-8': !!leftIcon, 'pr-8': rightIcon },
    className
  )

  return (
    <div>
      {label && (
        <label htmlFor={name} className={cn(s.Label, { [s.disabled]: props.disabled })}>
          {label}
        </label>
      )}

      <div className={cn(s.Container, { [s.disabled]: props.disabled })}>
        {leftIcon && <div className={s.LeftIcon}>{leftIcon}</div>}

        <input id={name} type="text" className={inputClassName} {...props} {...field} />

        {rightIcon && <div className={s.RightIcon}>{rightIcon}</div>}
      </div>

      {error && <span className="text-sm text-red-500">{error.message || 'This field is required.'}</span>}
    </div>
  )
}
