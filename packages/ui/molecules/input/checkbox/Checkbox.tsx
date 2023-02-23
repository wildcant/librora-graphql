import { Icon } from '@atoms'
import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './Checkbox.module.css'

export type CheckboxFieldProps<TValues extends FieldValues> = UseControllerProps<TValues> &
  Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'disabled' | 'type'> & {
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
}: CheckboxFieldProps<TValues>) {
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
    <div className={cn('flex flex-col', className)}>
      <div
        className={cn(s.CheckboxContainer, { [s.disabled]: disabled })}
        onKeyDown={(e) => e.key === ' ' && toggleCheckbox()}
        onClick={toggleCheckbox}
        tabIndex={0}
      >
        <Icon name="checkbox-blank" className={cn(s.Checkbox, { [s.checked]: field.value })} />
        {field.value && (
          <span className="absolute text-white">
            <Icon name="check" />
          </span>
        )}
        <div className="ml-1 select-none" role="checkbox" aria-checked={field.value}>
          <p className="text-sm">{label}</p>
        </div>
      </div>
      {error && <span className="text-sm text-red-500">{error.message || 'This field is required.'}</span>}
    </div>
  )
}
