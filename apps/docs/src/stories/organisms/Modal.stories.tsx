import { Dialog, Transition } from '@headlessui/react'
import { ComponentMeta } from '@storybook/react'
import { Fragment, ReactNode } from 'react'
import { Button, Divider, Icon, ModalProvider, useBareModal, useConfirmationModal, useCustomModal } from 'ui'

export default {
  title: 'Organisms/Modal',
  component: ModalProvider,
  argTypes: {},
} as ComponentMeta<typeof ModalProvider>

const Provider = ({ children }: { children: ReactNode }) => (
  <main className="overflow-hidden">
    <ModalProvider>{children}</ModalProvider>
  </main>
)

const Confirmation = () => {
  const { open } = useConfirmationModal({
    id: 'confirmation-modal-story',
  })
  return <Button onClick={open}>Open confirmation modal</Button>
}

const Custom = () => {
  const { open } = useCustomModal({
    id: 'custom-modal-story',
    closeButton: true,
    children: (
      <>
        <p>Select a box</p>
        <br />
        <div className="flex flex-wrap gap-2 justify-between">
          {[1, 2, 3, 4, 5].map((box) => (
            <div key={box} className="w-10 h-10 bg-red-400 p-1" />
          ))}
        </div>
      </>
    ),
  })
  return <Button onClick={open}>Open custom modal</Button>
}

const MobileCustom = () => {
  const { open, close } = useBareModal({
    id: 'custom-modal-story',

    children: (
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
                <button className="p-0 m-0" onClick={() => close()}>
                  <div className="border border-solid border-neutral-300 rounded-full p-1 bg-neutral-50">
                    <Icon name="close" size="sm" />
                  </div>
                </button>
                <h3 className="text-xs font-bold leading-6 text-neutral-900">Filters</h3>
                <span />
              </Dialog.Title>
              <Divider />
              <div className="top-0 left-0 w-full flex-1 overflow-y-auto px-6 py-4">
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
                <input type="text" name="" id="" className="block mb-4" />
              </div>
              <div className="w-full h-16 z-50 border border-solid border-t-neutral-200 flex justify-between px-6 py-4">
                <Button size="xs" variant="link">
                  Reestablish
                </Button>
                <Button size="xs" variant="solid">
                  Search
                </Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    ),
  })
  return <Button onClick={open}>Open mobile modal</Button>
}

export const ConfirmationModal = () => {
  return (
    <Provider>
      <Confirmation />
    </Provider>
  )
}

export const CustomModal = () => {
  return (
    <Provider>
      <Custom />
    </Provider>
  )
}

export const MobileModal = () => {
  return (
    <Provider>
      <MobileCustom />
    </Provider>
  )
}
