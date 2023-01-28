import { Toast } from 'ui/atoms/toast/Toast'

export interface LayoutProps {
  children?: React.ReactNode
}

export function DefaultLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Toast />
    </>
  )
}
