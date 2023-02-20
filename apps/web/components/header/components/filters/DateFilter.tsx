import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button, RangeCalendar, useBareModal, useModalContext } from 'ui'
import { useDateRangeFilterState } from '~store/filters'

const BOOKS_SEARCH_DATE_FILTER_MODAL_ID = 'books-search-date-filter'

function BooksSearchDateFilter({ onNextFilter }: { onNextFilter: () => void }) {
  const [calendarKey, setCalendarKey] = useState(Date.now())
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
          <Dialog.Panel className="flex h-[calc(100%-0.5rem)] w-full flex-col rounded-2xl rounded-t-2xl bg-white">
            <Dialog.Title
              as="h3"
              className="flex h-12 flex-row items-center justify-between border-b-neutral-500 px-6 pt-4 text-xl"
            >
              When’s your next read?
            </Dialog.Title>
            <div className="flex-1 self-center">
              <RangeCalendar key={calendarKey} onChange={setDateRangeFilter} value={dateRangeFilter} />
            </div>
            <div className="z-50 flex h-16 w-full justify-between border border-solid border-t-neutral-200 px-6 py-4">
              {!dateRangeFilter && (
                <Button size="xs" variant="link" onClick={goToNextFilter}>
                  Skip
                </Button>
              )}
              {dateRangeFilter && (
                <Button
                  size="xs"
                  variant="link"
                  onClick={() => {
                    setCalendarKey(Date.now())
                    setDateRangeFilter(undefined)
                  }}
                >
                  Clear
                </Button>
              )}
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
