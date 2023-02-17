import { Dialog, Transition } from '@headlessui/react'
import { useDisclosure } from '@librora/utils/hooks'
import format from 'date-fns/format'
import { ComponentPropsWithoutRef, Fragment } from 'react'
import { Button, Divider, Icon, Link, RangeValue, useBareModal, useModalContext } from 'ui'
import { useFiltersState } from '~store/filters'
import { buildSearchQuery } from '~utils/search'
import { useDateFilter } from './DateFilter'
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
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm my-2">
      {!hideButton && (
        <button className="p-0 m-0 w-full flex justify-between items-center" {...props}>
          <span className="text-neutral-500 font-light text-sm">{fieldName}</span>
          <span className="text-neutral-700 font-light text-sm">{fieldValue ?? fieldPlaceholder}</span>
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

function BooksSearchFilters() {
  const { closeModal } = useModalContext()
  const [filterOpened, filterOpenedHandlers] = useDisclosure(false)
  const { filters } = useFiltersState()

  const { open: openTopicFilterModal } = useTopicFilter({ onClose: () => filterOpenedHandlers.close() })
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
          <Dialog.Panel className="w-full rounded-t-2xl bg-[#F7F7F7] h-[calc(100%-0.5rem)] flex flex-col">
            <Dialog.Title
              as="div"
              className="flex flex-row justify-between items-center border-b-neutral-500 h-12 px-6"
            >
              <button className="p-0 m-0" onClick={() => closeModal(BOOKS_SEARCH_MODAL_ID)}>
                <div className="border border-solid border-neutral-300 rounded-full p-1 bg-neutral-50">
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
                // fieldValue={filters.topic}
              />
              <FilterField fieldName="Language" fieldPlaceholder="Linguistic preference" />
            </div>
            <div className="w-full h-16 z-50 border border-solid border-t-neutral-200 flex justify-between px-6 py-4">
              <Button size="xs" variant="link">
                Reestablish
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
  return useBareModal({
    id: BOOKS_SEARCH_MODAL_ID,
    children: <BooksSearchFilters />,
  })
}
