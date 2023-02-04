import { Listbox, Transition } from '@headlessui/react'
import { Icon } from '@atoms'
import cn from 'classnames'
import { Fragment } from 'react'
import { FieldError, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import s from './Select.module.css'

export type OptionValue = string | number
export type Option<
  T extends OptionValue = string,
  TMeta extends Record<string, string | number | boolean> = {}
> = {
  value: T
  label: string
  meta?: TMeta
}

interface IListboxProps {
  defaultValue?: Option | undefined
  disabled?: boolean | undefined
  horizontal?: boolean | undefined
  multiple?: boolean | undefined
  name?: string | undefined
  onChange?(value: Option): void
  value?: Option | undefined
  label?: string
  error?: FieldError
}

export interface ISelectProps extends IListboxProps {
  options: Option[]
}

export function Select({ options, value, error, ...props }: ISelectProps) {
  return (
    <Listbox value={value} {...props} defaultValue={null}>
      {({ open }) => (
        <div className="relative mt-1">
          <div className="relative">
            <label
              className={cn(s.SelectLabel, {
                [s.displayLabelTop]: open || !!value,
                [s.focus]: open,
                [s.valid]: !error,
                [s.error]: error,
              })}
            >
              Name
            </label>
            <Listbox.Button
              className={cn(s.Button, { [s.focus]: open, [s.valid]: !error, [s.error]: error })}
            >
              {(buttonProps) => (
                <>
                  <span className={s.ButtonLabel}>{buttonProps.value?.label}</span>
                  <span className={s.ArrowContainer}>
                    <Icon
                      name={buttonProps.open ? 'arrow-up' : 'arrow-down'}
                      className={s.Arrow}
                      aria-hidden="true"
                    />
                  </span>
                </>
              )}
            </Listbox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className={s.OptionContainer}>
              {options.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) => cn(s.Option, { [s.active]: active, [s.inactive]: !active })}
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn(s.OptionLabel, { [s.selected]: selected })}>{person.label}</span>

                      {selected ? (
                        <span className={s.CheckContainer}>
                          <Icon name="check" className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          {error && (
            <span className="text-sm text-red-500">{error.message || 'This field is required.'}</span>
          )}
        </div>
      )}
    </Listbox>
  )
}

interface ISelectFieldProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<ISelectProps, 'options' | 'disabled' | 'label'> {}

export function SelectField<TValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: ISelectFieldProps<TValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return <Select error={error} {...field} {...props} />
}
