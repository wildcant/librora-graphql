import cn from 'classnames'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './TextField.module.css'

export interface ITextFieldProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'disabled' | 'type'> {
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

  console.log({ error })

  const inputClassName = cn(
    s.Input,
    {
      [s.valid]: !error,
      [s.error]: !!error,
      [s.disabled]: props.disabled,
      [s.withIconLeft]: !!leftIcon,
      [s.withIconRight]: !!rightIcon,
    },
    className
  )
  console.log({ inputClassName })

  return (
    <div className={s.Container}>
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
        >
          {label}
        </label>
      )}

      <div className={cn(s.InputContainer, { [s.disabled]: props.disabled })}>
        {leftIcon && <div className={s.LeftIcon}>{leftIcon}</div>}

        <input id={name} type="text" className={inputClassName} {...props} {...field} />

        {rightIcon && <div className={s.RightIcon}>{rightIcon}</div>}
      </div>

      {error && <span className="text-sm text-red-500 ">{error.message || 'This field is required.'}</span>}
    </div>
  )
}
