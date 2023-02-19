import { Icon, Progress } from '@atoms'
import { Dialog, Transition } from '@headlessui/react'
import { createContext } from '@librora/utils/hooks'
import { Button, IButtonProps } from '@molecules'
import { ComponentPropsWithoutRef, Fragment, PropsWithChildren, ReactNode, useState } from 'react'
import { ExtractProps } from '../../types'

interface IModalProviderProps {
  modals: IModalProps[]
  openModal: (id: IModalProps) => void
  setModalIsLoading: (id: string, isLoading: boolean) => void
  closeModal: (id: string) => void
  isModalLoading: (id: string) => boolean
}

const [Provider, useContext] = createContext<IModalProviderProps>({
  name: 'ModalContext',
  hookName: 'useModalContext',
  providerName: 'ModalProvider',
})

type ModalVariant = 'confirmation' | 'custom' | 'bare'

interface IModalProps {
  id: string
  variant: ModalVariant
  isLoading?: boolean
  titleProps?: ComponentPropsWithoutRef<'p'>
  children?: ReactNode
  primaryProps?: IButtonProps
  secondaryProps?: IButtonProps
  closeButton?: boolean
  containerProps?: ExtractProps<typeof Dialog>
  contentTransitionProps?: Pick<
    ExtractProps<typeof Transition>,
    'enter' | 'enterFrom' | 'enterTo' | 'leave' | 'leaveFrom' | 'leaveTo'
  >
  contentProps?: ExtractProps<typeof Dialog.Panel>
  onClose?: () => void
  hideOverlay?: boolean
}

function getTitleContent(variant: ModalVariant, children: ReactNode) {
  if (children) {
    return children
  }
  switch (variant) {
    case 'confirmation':
    default:
      return 'Aviso'
  }
}

function getModalContent(variant: ModalVariant, children: ReactNode) {
  if (children) {
    return children
  }
  switch (variant) {
    case 'confirmation':
    default:
      return '¿Estás seguro?'
  }
}

function Modal(props: IModalProps) {
  const {
    id,
    variant,
    titleProps,
    primaryProps,
    secondaryProps,
    closeButton,
    children,
    containerProps,
    contentTransitionProps,
    contentProps,
    onClose,
    hideOverlay,
  } = props

  const { modals, closeModal } = useModalContext()

  const modal = modals.find((m) => m.id === id)
  const isConfirmation = variant === 'confirmation'
  const isBare = variant === 'bare'
  return (
    <Transition appear show={!!modal} as={Fragment}>
      <Dialog
        onClose={() => {
          onClose?.()
          closeModal(id)
        }}
        {...containerProps}
      >
        {!hideOverlay && (
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
        )}
        {isBare ? (
          children
        ) : (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                {...contentTransitionProps}
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  {...contentProps}
                >
                  {closeButton && (
                    <button onClick={() => closeModal(id)} className="absolute right-7 hover:bg-neutral-100">
                      <Icon name="close" size="md" className="text-gray-500" />
                    </button>
                  )}
                  {modal?.isLoading && <Progress />}
                  {isConfirmation && (
                    <p className="text-gray-700" {...titleProps}>
                      {getTitleContent(variant, titleProps?.children)}
                    </p>
                  )}
                  {getModalContent(variant, children)}
                  {isConfirmation && (
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        color="primary"
                        // size={{ base: 'xs', md: 'sm' }}
                        size="sm"
                        {...primaryProps}
                        disabled={primaryProps?.disabled || modal?.isLoading}
                      >
                        {primaryProps?.children ?? 'Confirmar'}
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => closeModal(id)}
                        // size={{ base: 'xs', md: 'sm' }}
                        size="sm"
                        variant="ghost"
                        {...secondaryProps}
                        disabled={secondaryProps?.disabled || modal?.isLoading}
                      >
                        {secondaryProps?.children ?? 'Cancelar'}
                      </Button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        )}
      </Dialog>
    </Transition>
  )
}

export const useModalContext = useContext
export function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<IModalProps[]>([])

  const openModal = (modal: IModalProps) =>
    setModals((currentModals) => {
      const modalIndex = currentModals.findIndex((m) => m.id === modal.id)
      // Add the modal if it doesn't exist.
      if (modalIndex === -1) {
        return [...currentModals, modal]
      }
      return currentModals
    })

  const closeModal = (id: string) =>
    setModals((currentModals) => currentModals.filter((modal) => modal.id !== id))

  const setModalIsLoading = (id: string, isLoading: boolean) =>
    setModals((currentModals) => {
      const updatedModals = [...currentModals]
      const modalIndex = currentModals.findIndex((modal) => modal.id === id)
      // If the modal exist update isLoading flag.
      if (modalIndex !== -1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        updatedModals[modalIndex]!.isLoading = isLoading
      }
      return updatedModals
    })

  const isModalLoading = (id: string) => !!modals.find((modal) => modal.id === id)?.isLoading

  return (
    <Provider
      value={{
        modals,
        openModal,
        closeModal,
        setModalIsLoading,
        isModalLoading,
      }}
    >
      {children}
      {modals.map((props) => (
        <Modal key={props.id} {...props} />
      ))}
    </Provider>
  )
}

interface IUseConfirmationModalProps
  extends Pick<
    IModalProps,
    | 'id'
    | 'titleProps'
    | 'children'
    | 'primaryProps'
    | 'secondaryProps'
    | 'isLoading'
    | 'closeButton'
    | 'containerProps'
  > {}

export function useConfirmationModal(props: IUseConfirmationModalProps) {
  const { openModal, closeModal } = useModalContext()
  return {
    open: () => openModal({ variant: 'confirmation', ...props }),
    close: () => closeModal(props.id),
  }
}

interface IUseCustomModalProps
  extends Pick<
    IModalProps,
    | 'id'
    | 'children'
    | 'isLoading'
    | 'closeButton'
    | 'containerProps'
    | 'onClose'
    | 'contentTransitionProps'
    | 'contentProps'
  > {}

export function useCustomModal(props: IUseCustomModalProps) {
  const { openModal, closeModal } = useModalContext()
  return {
    open: () => openModal({ variant: 'custom', ...props }),
    close: () => closeModal(props.id),
  }
}

interface IUseBareModalProps
  extends Pick<
    IModalProps,
    | 'id'
    | 'children'
    | 'isLoading'
    | 'closeButton'
    | 'containerProps'
    | 'onClose'
    | 'contentTransitionProps'
    | 'contentProps'
    | 'hideOverlay'
  > {}

export function useBareModal(props: IUseBareModalProps) {
  const { openModal, closeModal } = useModalContext()

  return {
    open: () => openModal({ variant: 'bare', ...props }),
    close: () => closeModal(props.id),
  }
}
