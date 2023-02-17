import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button, useBareModal } from 'ui'

const BOOKS_SEARCH_TOPIC_FILTER_MODAL_ID = 'books-search-topic-filter'

function BooksSearchTopicFilter() {
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
              as="div"
              className="flex flex-row justify-between items-center border-b-neutral-500 h-12 px-6"
            >
              What topic are you interested on learning today?
            </Dialog.Title>
            <div className="top-0 left-0 w-full flex-1 overflow-y-auto px-6 py-4"></div>
            <div className="w-full h-16 z-50 border border-solid border-t-neutral-200 flex justify-between px-6 py-4">
              <Button size="xs" variant="link">
                Skip
              </Button>
              <Button size="xs" variant="solid">
                Next
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}

export function useTopicFilter({ onClose }: { onClose: () => void }) {
  const modalActions = useBareModal({
    id: BOOKS_SEARCH_TOPIC_FILTER_MODAL_ID,
    onClose,
    hideOverlay: true,
    children: <BooksSearchTopicFilter />,
  })
  return modalActions
}
