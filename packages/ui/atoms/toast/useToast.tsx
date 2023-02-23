import { Icon, IconProps } from '@atoms'
import { toast, ToastContent, ToastOptions, TypeOptions } from 'react-toastify'

type ToastProps = ToastOptions

const toastTypeToIcon: { [key in TypeOptions]: IconProps } = {
  default: { name: 'info' },
  error: { name: 'error' },
  info: { name: 'info' },
  success: { name: 'checkbox-circle' },
  warning: { name: 'warning' },
}

type UseToastArgs = {
  variant?: 'default' | 'dark' | 'promise'
}

export function useToast(args?: UseToastArgs) {
  const { variant = 'default' } = args ?? {}

  return {
    notify(content: ToastContent = '', props?: Omit<ToastProps, 'position'>) {
      const { type = 'info', ...rest } = props ?? {}

      const options: ToastOptions = {
        position: toast.POSITION.BOTTOM_CENTER,
        type,
        icon: (iconProps) => <Icon {...toastTypeToIcon[iconProps.type]} className="fill-white" />,
        ...rest,
      }

      switch (variant) {
        case 'default':
          toast(content, options)
          break

        // TODO: Implement dark and promise variants.
        default:
          break
      }
    },
  }
}
