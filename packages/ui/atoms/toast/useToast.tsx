import { Icon, IIconProps } from '@atoms'
import { toast, ToastContent, ToastOptions, TypeOptions } from 'react-toastify'

interface IToastProps extends ToastOptions {}

const toastTypeToIcon: { [key in TypeOptions]: IIconProps } = {
  default: { name: 'info' },
  error: { name: 'error' },
  info: { name: 'info' },
  success: { name: 'checkbox-circle' },
  warning: { name: 'warning' },
}

interface IUseToastArgs {
  variant?: 'default' | 'dark' | 'promise'
}

export function useToast(args?: IUseToastArgs) {
  const { variant = 'default' } = args ?? {}

  return {
    notify(content: ToastContent = '', props?: Omit<IToastProps, 'position'>) {
      const { type = 'info', ...rest } = props ?? {}

      const options: ToastOptions = {
        position: toast.POSITION.BOTTOM_CENTER,
        type,
        icon: ({ type }) => <Icon {...toastTypeToIcon[type]} className="fill-white" />,
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
