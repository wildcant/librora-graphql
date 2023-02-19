import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button, RangeCalendar, useBareModal, useModalContext } from 'ui'
import { useDateRangeFilterState } from '~store/filters'

const BOOKS_SEARCH_DATE_FILTER_MODAL_ID = 'books-search-date-filter'

function BooksSearchDateFilter({ onNextFilter }: { onNextFilter: () => void }) {
  const { closeModal } = useModalContext()
  const { dateRangeFilter, setDateRangeFilter } = useDateRangeFilterState()
  const goToNextFilter = () => {
    onNextFilter()
    setTimeout(() => closeModal(BOOKS_SEARCH_DATE_FILTER_MODAL_ID), 200)
  }

  return (
    <div className="fixed inset-0 h-full">
      <div className="flex h-full items-end pt-20">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Panel className="w-full rounded-t-2xl bg-white h-[calc(100%-0.5rem)] flex flex-col rounded-2xl">
            <Dialog.Title
              as="h3"
              className="flex flex-row justify-between items-center border-b-neutral-500 h-12 px-6 pt-4 text-xl"
            >
              When’s your next read?
            </Dialog.Title>
            <div className="self-center flex-1">
              <RangeCalendar onChange={setDateRangeFilter} defaultValue={dateRangeFilter} />
            </div>
            <div className="w-full h-16 z-50 border border-solid border-t-neutral-200 flex justify-between px-6 py-4">
              <Button size="xs" variant="link" onClick={goToNextFilter}>
                Skip
              </Button>
              <Button size="xs" variant="solid" onClick={goToNextFilter}>
                Next
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}

export function useDateFilter({ onClose, onNextFilter }: { onClose: () => void; onNextFilter: () => void }) {
  const modalActions = useBareModal({
    id: BOOKS_SEARCH_DATE_FILTER_MODAL_ID,
    onClose,
    hideOverlay: true,
    children: <BooksSearchDateFilter onNextFilter={onNextFilter} />,
  })
  return modalActions
}
