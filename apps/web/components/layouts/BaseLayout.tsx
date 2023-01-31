import { Toast } from 'ui/atoms/toast/Toast'

export interface LayoutProps {
  children?: React.ReactNode
}

export function BaseLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Toast />
    </>
  )
}
