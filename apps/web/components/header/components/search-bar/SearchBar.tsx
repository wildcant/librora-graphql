import { Icon } from 'ui'
import { Button } from '@molecules'
import cn from 'classnames'
import { ComponentPropsWithoutRef, useRef } from 'react'
import { useSearchFilterState } from '~store/filters'
import { useBooksSearchFiltersModal } from '../filters/mobile/FiltersModal'
import s from './SearchBar.module.css'

export function SearchBar({ className, ...props }: ComponentPropsWithoutRef<'input'>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchFilter, setSearchFilter } = useSearchFilterState()
  const { open: openModal } = useBooksSearchFiltersModal()

  return (
    <>
      <div className={cn(s.SearchBox, className)}>
        <div className="relative flex flex-1 flex-row items-center">
          <input
            id={props.name}
            type="text"
            className={s.Input}
            autoComplete="off"
            {...props}
            ref={inputRef}
            onChange={(e) => {
              setSearchFilter(e.target.value)
              props.onChange?.(e)
            }}
          />

          <Icon name="search" className="absolute left-4" size="sm" />

          {searchFilter && (
            <Button
              variant="unstyled"
              className="pr-2 md:pr-6"
              icon={<Icon name="close-circle-fill" size="sm" />}
              size="sm"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = ''
                  setSearchFilter('')
                }
              }}
            />
          )}
        </div>

        <div className="block md:hidden">
          <button
            type="button"
            className="focus-visible:outline-primary-500 h-full w-full rounded-r-full p-0"
            onClick={openModal}
          >
            <div className="mx-2 rounded-full border border-solid p-2">
              <Icon name="equalizer" size="sm" />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
