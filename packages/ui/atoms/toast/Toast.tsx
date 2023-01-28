import { Button } from '@molecules'
import { Icon } from '@atoms'
import cn from 'classnames'
import { ToastContainer } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import s from './Toast.module.css'

// WE ONLY NEED TO CALL THIS ONCE
if (typeof window !== 'undefined') {
  injectStyle()
}

export { useToast } from './useToast'

export function Toast() {
  return (
    <ToastContainer
      toastClassName={(options) =>
        cn(s.Toast, {
          [s.default]: options?.type === 'default',
          [s.error]: options?.type === 'error',
          [s.info]: options?.type === 'info',
          [s.success]: options?.type === 'success',
          [s.warning]: options?.type === 'warning',
        })
      }
      bodyClassName={(options) =>
        cn(s.ToastBody, {
          [s.default]: options?.type === 'default',
          [s.error]: options?.type === 'error',
          [s.info]: options?.type === 'info',
          [s.success]: options?.type === 'success',
          [s.warning]: options?.type === 'warning',
        })
      }
      progressClassName={(options) =>
        cn(s.Progress, {
          [s.default]: options?.type === 'default',
          [s.error]: options?.type === 'error',
          [s.info]: options?.type === 'info',
          [s.success]: options?.type === 'success',
          [s.warning]: options?.type === 'warning',
        })
      }
      closeButton={() => (
        <Button variant="unstyled">
          <Icon name="close" className="fill-neutral-200" />
        </Button>
      )}
    />
  )
}
