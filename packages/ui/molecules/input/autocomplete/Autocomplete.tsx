import { Icon } from '@atoms'
import { Combobox, Transition } from '@headlessui/react'
import cn from 'classnames'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { FieldError, FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { Option } from '../types'
import s from './Autocomplete.module.css'

type IComboboxProps = {
  disabled?: boolean
  name?: string
  label?: string
  error?: FieldError
} & (
  | {
      multiple: true
      defaultValue?: Option[]
      value?: Option[]
      onChange?(value: Option[]): void
    }
  | {
      multiple: false
      defaultValue?: Option
      value?: Option
      onChange?(value: Option): void
    }
)

export type IAutocompleteProps = IComboboxProps & {
  options: Option[]
}

type AutocompleteInputProps = Pick<IAutocompleteProps, 'error' | 'label' | 'disabled'> & {
  value?: Option | Option[] | null
  activeIndex: number | null
  open: boolean
  setQuery: Dispatch<SetStateAction<string>>
}

function AutocompleteInput({
  value,
  activeIndex,
  error,
  label,
  open,
  setQuery,
  disabled,
}: AutocompleteInputProps) {
  return (
    <div className="relative w-full">
      <label
        htmlFor="autocomplete"
        className={cn(s.Label, {
          [s.displayLabelTop]: open || !!value || !activeIndex,
          [s.focus]: open,
          [s.valid]: !error,
          [s.error]: error,
        })}
      >
        {label}
      </label>
      <Combobox.Input
        id="autocomplete"
        className={cn(s.Input, { [s.valid]: !error, [s.error]: error, [s.disabled]: disabled })}
        autoComplete="off"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(option) => {
          if (Array.isArray(option)) {
            const selectedOptionsLabels = option.map((opt) => (opt as unknown as Option | undefined)?.label)
            return `${selectedOptionsLabels.join(', ')}${selectedOptionsLabels.length ? ', ' : ''}`
          }
          return (option as unknown as Option | undefined)?.label ?? ''
        }}
      />

      <Combobox.Button
        className={cn('absolute inset-y-0 right-0 px-2', { 'cursor-not-allowed opacity-50': disabled })}
      >
        <Icon
          name={open ? 'arrow-up' : 'arrow-down'}
          className="text-gray-400"
          size="lg"
          aria-hidden="true"
        />
      </Combobox.Button>
    </div>
  )
}

type AutocompleteOptionsProps = Pick<IAutocompleteProps, 'options'> & {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

function AutocompleteOptions({ setQuery, query, options }: AutocompleteOptionsProps) {
  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          // In case it's multi select we must check the last typed option only.
          const optionsSelected = query.split(',')
          const currentQuery = optionsSelected[optionsSelected.length - 1].trim()

          return option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(currentQuery.toLowerCase().replace(/\s+/g, ''))
        })

  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterLeave={() => setQuery('')}
    >
      <Combobox.Options className={s.OptionContainer}>
        {filteredOptions.length === 0 && query !== '' ? (
          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
        ) : (
          filteredOptions.map((option) => (
            <Combobox.Option
              key={option.value}
              value={option}
              className={(optionProps) => cn(s.Option, { [s.selected]: optionProps.selected })}
            >
              {(optionProps) => (
                <div
                  className={cn(s.OptionLabel, {
                    [s.selected]: optionProps.selected,
                    [s.active]: optionProps.active,
                  })}
                >
                  {option.label}
                </div>
              )}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Transition>
  )
}

type AutocompleteSingleSelectProps = Pick<IAutocompleteProps, 'error' | 'label' | 'options' | 'disabled'> & {
  name?: string
  defaultValue?: Option
  value?: Option
  onChange?(value?: Option): void
}

function AutocompleteSingleSelect({
  defaultValue,
  onChange,
  name,
  label,
  error,
  options,
  disabled,
}: AutocompleteSingleSelectProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Option | undefined>(defaultValue ?? undefined)
  const handleChange = (val: Option | undefined) => {
    setSelected(val)
    onChange?.(val)
  }

  return (
    <Combobox name={name} value={selected} onChange={handleChange} nullable disabled={disabled}>
      {({ open, activeIndex, value }) => (
        <div className="relative">
          <AutocompleteInput
            value={value}
            activeIndex={activeIndex}
            open={open}
            setQuery={setQuery}
            label={label}
            error={error}
            disabled={disabled}
          />
          <AutocompleteOptions query={query} setQuery={setQuery} options={options} />
          {error && (
            <span className="text-sm text-red-500">{error.message || 'This field is required.'}</span>
          )}
        </div>
      )}
    </Combobox>
  )
}

type AutocompleteMultiSelectProps = Pick<IAutocompleteProps, 'error' | 'label' | 'options' | 'disabled'> & {
  name?: string
  defaultValue?: Option[]
  value?: Option[]
  onChange?(value: Option[]): void
}

function AutocompleteMultiSelect({
  defaultValue,
  onChange,
  name,
  label,
  error,
  options,
  disabled,
}: AutocompleteMultiSelectProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Option[]>(defaultValue ?? [])
  const handleChange = (val: Option[]) => {
    setSelected(val)
    onChange?.(val)
  }

  return (
    <Combobox name={name} value={selected} onChange={handleChange} multiple disabled={disabled}>
      {({ open, activeIndex, value }) => (
        <div className="relative">
          <AutocompleteInput
            value={value}
            activeIndex={activeIndex}
            open={open}
            setQuery={setQuery}
            label={label}
            error={error}
            disabled={disabled}
          />
          <AutocompleteOptions query={query} setQuery={setQuery} options={options} />
          {error && (
            <span className="text-sm text-red-500">{error.message || 'This field is required.'}</span>
          )}
        </div>
      )}
    </Combobox>
  )
}

export function Autocomplete(props: IAutocompleteProps) {
  // Conditionally render based on multiple flag, because of issues with combobox component types.
  // Could be improved after future improvement to headless ui types.
  return props.multiple ? <AutocompleteMultiSelect {...props} /> : <AutocompleteSingleSelect {...props} />
}

interface IAutocompleteFieldProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<IAutocompleteProps, 'options' | 'disabled' | 'label' | 'multiple'> {}

export function AutocompleteField<TValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  ...props
}: IAutocompleteFieldProps<TValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return <Autocomplete error={error} {...field} {...props} />
}
