import { Dialog, Transition } from '@headlessui/react'
import { ELanguage } from '@librora/api/schema'
import { useDisclosure } from '@librora/utils/hooks'
import format from 'date-fns/format'
import { ComponentPropsWithoutRef, Fragment } from 'react'
import { Button, Divider, Icon, Link, RangeValue, useBareModal, useModalContext } from 'ui'
import { clearAllFilters, useFiltersState, useReestablishFiltersFromQueryParams } from '~store/filters'
import { buildSearchQuery } from '~utils/search'
import { useDateFilter } from './DateFilter'
import { useLanguageFilter } from './LanguageFilter'
import { useTopicFilter } from './TopicFilter'

function FilterField({
  children,
  fieldName,
  fieldPlaceholder,
  hideButton,
  fieldValue,
  ...props
}: ComponentPropsWithoutRef<'button'> & {
  fieldName: string
  fieldPlaceholder: string
  hideButton?: boolean
  fieldValue?: string
}) {
  return (
    <div className="my-2 w-full rounded-2xl bg-white p-4 shadow-sm">
      {!hideButton && (
        <button className="m-0 flex w-full items-center justify-between p-0" {...props}>
          <span className="text-sm font-light text-neutral-500">{fieldName}</span>
          <span className="text-sm font-light text-neutral-700">{fieldValue ?? fieldPlaceholder}</span>
        </button>
      )}
      {children}
    </div>
  )
}

const BOOKS_SEARCH_MODAL_ID = 'books-search'

function SearchAction({ onSearch }: { onSearch: () => void }) {
  const { filters } = useFiltersState()

  return (
    <Link href={buildSearchQuery(filters)} size="xs" variant="button" onClick={() => onSearch()}>
      Search
    </Link>
  )
}

function formatDateRage(dateRange?: RangeValue<Date>): string | undefined {
  if (!dateRange) return
  return `${format(dateRange.start, 'MMM dd')} - ${format(dateRange.end, 'MMM dd')}`
}

// TODO: Abstract to generic utility for all enums.
const ELanguageAsKey: { [key in ELanguage]: keyof typeof ELanguage } = {
  ENGLISH: 'English',
}

function BooksSearchFilters() {
  const { closeModal } = useModalContext()
  const [filterOpened, filterOpenedHandlers] = useDisclosure(false)
  const { filters } = useFiltersState()

  const { open: openLanguageFilterModal } = useLanguageFilter({ onClose: () => filterOpenedHandlers.close() })

  const { open: openTopicFilterModal } = useTopicFilter({
    onClose: () => filterOpenedHandlers.close(),
    onNextFilter: openLanguageFilterModal,
  })
  const openTopicFilter = () => {
    openTopicFilterModal()
    filterOpenedHandlers.open()
  }

  const { open: openDateFilterModal } = useDateFilter({
    onClose: () => filterOpenedHandlers.close(),
    onNextFilter: openTopicFilterModal,
  })
  const openDateFilter = () => {
    openDateFilterModal()
    filterOpenedHandlers.open()
  }

  const topicFieldValue =
    filters.topics.length > 0
      ? `${filters.topics[0]}${filters.topics.length > 1 ? ' & more..' : ''}`
      : undefined

  return (
    <div className="fixed inset-0 h-full">
      <div className="flex h-full items-end pt-2">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-1/2"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1/2"
        >
          <Dialog.Panel className="flex h-[calc(100%-0.5rem)] w-full flex-col rounded-t-2xl bg-[#F7F7F7]">
            <Dialog.Title
              as="div"
              className="flex h-12 flex-row items-center justify-between border-b-neutral-500 px-6"
            >
              <button className="m-0 p-0" onClick={() => closeModal(BOOKS_SEARCH_MODAL_ID)}>
                <div className="rounded-full border border-solid border-neutral-300 bg-neutral-50 p-1">
                  <Icon name={filterOpened ? 'arrow-left-line' : 'close'} size="sm" />
                </div>
              </button>
              <h3 className="text-xs font-bold leading-6 text-neutral-900">Filters</h3>
              <span />
            </Dialog.Title>
            <Divider />
            <div className="top-0 left-0 w-full flex-1 overflow-y-auto px-6 py-4">
              <FilterField
                fieldName="When"
                fieldPlaceholder="Add dates"
                onClick={openDateFilter}
                fieldValue={formatDateRage(filters.dateRange)}
              />
              <FilterField
                fieldName="Topic"
                fieldPlaceholder="Add subject"
                onClick={openTopicFilter}
                fieldValue={topicFieldValue}
              />
              <FilterField
                fieldName="Language"
                fieldPlaceholder="Linguistic preference"
                onClick={openLanguageFilterModal}
                fieldValue={filters.language ? ELanguageAsKey[filters.language] : undefined}
              />
            </div>
            <div className="z-50 flex h-16 w-full justify-between border border-solid border-t-neutral-200 px-6 py-4">
              <Button size="xs" variant="link" onClick={clearAllFilters}>
                Clear All
              </Button>
              <SearchAction onSearch={() => closeModal(BOOKS_SEARCH_MODAL_ID)} />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}

export function useBooksSearchFiltersModal() {
  const { reestablishFiltersToQueryParams } = useReestablishFiltersFromQueryParams()
  return useBareModal({
    id: BOOKS_SEARCH_MODAL_ID,
    onClose: reestablishFiltersToQueryParams,
    children: <BooksSearchFilters />,
  })
}
