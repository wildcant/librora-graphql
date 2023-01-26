import { Icon } from '@atoms'
import { ComponentPropsWithoutRef, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './Checkbox.module.css'
import cn from 'classnames'

export interface ICheckboxFieldProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'disabled' | 'type'> {
  label?: string
}

export function CheckboxField<TValues extends FieldValues>({
  className,
  control,
  defaultValue,
  label,
  name,
  rules,
  disabled,
  shouldUnregister,
}: ICheckboxFieldProps<TValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  })

  const toggleCheckbox = () => !disabled && field.onChange(!field.value)

  return (
    <div className="flex flex-col">
      <div
        className={cn(s.CheckboxContainer, { [s.disabled]: disabled })}
        onKeyDown={(e) => e.key === ' ' && toggleCheckbox()}
        onClick={toggleCheckbox}
        tabIndex={0}
      >
        <Icon name="checkbox-blank" className={cn(s.Checkbox, { [s.checked]: field.value })} />
        {field.value && <Icon name="check" className="absolute fill-white" />}
        <div className="ml-1 select-none" role="checkbox" aria-checked={field.value}>
          {label}
        </div>
      </div>
      {error && <span className="text-sm text-red-500">{error.message || 'This field is required.'}</span>}
    </div>
  )
}
