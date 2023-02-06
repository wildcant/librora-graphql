import { Icon } from '@atoms'
import { Button } from '@molecules'
import { ComponentPropsWithoutRef } from 'react'
import { FieldValues, Path, PathValue, useController, UseControllerProps } from 'react-hook-form'
import s from './SearchBar.module.css'

export interface ISearchBarProps<TValues extends FieldValues>
  extends UseControllerProps<TValues>,
    Pick<ComponentPropsWithoutRef<'input'>, 'className' | 'disabled' | 'type' | 'placeholder'> {
  label?: string
}

export function SearchBar<TValues extends FieldValues>({
  name,
  control,
  rules,
  defaultValue = '' as PathValue<TValues, Path<TValues>>,
  ...props
}: ISearchBarProps<TValues>) {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  return (
    <div className="relative flex flex-row items-center rounded-md border border-solid shadow-lg">
      <Icon name="search" className="absolute left-2 opacity-30" />

      <input id={name} type="text" className={s.Input} autoComplete="off" {...props} {...field} />

      <Button
        variant="unstyled"
        icon={<Icon name="close-circle-fill" className="opacity-30 hover:opacity-70 active:opacity-100" />}
        className="absolute right-2"
        onClick={() => field.onChange()}
      />
    </div>
  )
}
