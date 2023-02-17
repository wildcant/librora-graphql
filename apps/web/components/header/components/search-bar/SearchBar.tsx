import { Icon } from '@atoms'
import { Button } from '@molecules'
import { ComponentPropsWithoutRef, useRef } from 'react'
import { useSearchFilterState } from '~store/filters'
import { useBooksSearchFiltersModal } from '../filters/Filters'
import s from './SearchBar.module.css'

export function SearchBar(props: ComponentPropsWithoutRef<'input'>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchFilter, setSearchFilter } = useSearchFilterState()
  const { open: openModal } = useBooksSearchFiltersModal()

  return (
    <>
      <div className={s.SearchBox}>
        <div className="flex-1 relative flex flex-row items-center">
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

        <div className="block">
          <button
            type="button"
            className="p-0 h-full w-full rounded-r-full focus-visible:outline-primary-500"
            onClick={openModal}
          >
            <div className="border border-solid rounded-full p-2 mx-2">
              <Icon name="equalizer" size="sm" />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
