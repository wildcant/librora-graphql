import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button, Toast, useToast } from 'ui'

export default {
  title: 'Atoms/Toast',
  component: Toast,
  argTypes: {},
} as ComponentMeta<typeof Toast>

export const Default = () => {
  const { notify } = useToast()

  const displayToasts = () => {
    notify('info msg', { type: 'info' })
    notify('success msg', { type: 'success' })
    notify('warning msg', { type: 'warning' })
    notify('error msg', { type: 'error' })
  }

  return (
    <>
      <Button onClick={displayToasts} size="sm">
        Display toast
      </Button>
      <Toast />
    </>
  )
}
