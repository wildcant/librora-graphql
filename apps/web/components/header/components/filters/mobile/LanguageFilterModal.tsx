import { Dialog, Transition } from '@headlessui/react'
import { ELanguage } from '@librora/api/schema'
import { Fragment, useState } from 'react'
import { Autocomplete, Button, Option, useBareModal, useModalContext } from 'ui'
import { useLanguageFilterState } from '~store/filters'

const BOOKS_SEARCH_LANGUAGE_FILTER_MODAL_ID = 'books-search-language-filter'

function BooksSearchLanguageFilter() {
  const [autocompleteKey, setAutocompleteKey] = useState(Date.now())
  const { languageFilter, setLanguageFilter } = useLanguageFilterState()

  const languageOptions: Option<ELanguage>[] = Object.keys(ELanguage).map((langKey) => ({
    value: ELanguage[langKey as keyof typeof ELanguage],
    label: langKey,
  }))

  const defaultValue = languageOptions.find((l) => l.value === languageFilter)

  const { closeModal } = useModalContext()
  const close = () => {
    closeModal(BOOKS_SEARCH_LANGUAGE_FILTER_MODAL_ID)
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
              What language are you interested on learning today?
            </Dialog.Title>
            <div className="top-0 left-0 mt-4 w-full flex-1 overflow-y-auto px-6 py-4">
              <Autocomplete
                key={autocompleteKey}
                multiple={false}
                defaultValue={defaultValue}
                label="Search Languages"
                onChange={(selectedLanguages) => setLanguageFilter(selectedLanguages?.value as ELanguage)}
                options={languageOptions}
              />
            </div>
            <div className="z-50 flex h-16 w-full justify-between border border-solid border-t-neutral-200 px-6 py-4">
              {!languageFilter && (
                <Button size="xs" variant="link" onClick={close}>
                  Skip
                </Button>
              )}
              {languageFilter && (
                <Button
                  size="xs"
                  variant="link"
                  onClick={() => {
                    setAutocompleteKey(Date.now())
                    setLanguageFilter(undefined)
                  }}
                >
                  Clear
                </Button>
              )}

              <Button size="xs" variant="solid" onClick={close}>
                Close
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}

export function useLanguageFilter({ onClose }: { onClose: () => void }) {
  const modalActions = useBareModal({
    id: BOOKS_SEARCH_LANGUAGE_FILTER_MODAL_ID,
    onClose,
    hideOverlay: true,
    children: <BooksSearchLanguageFilter />,
  })
  return modalActions
}
