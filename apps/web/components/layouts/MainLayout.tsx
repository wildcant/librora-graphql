import { ReactNode } from 'react'
import { Header } from '../header/Header'
import { BaseLayout } from './BaseLayout'

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <BaseLayout>
      <Header />
      <div className="container mx-auto h-full min-h-96 w-full">
        <div className="p-6 pb-16 md:py-0 md:px-0">{children}</div>
      </div>
    </BaseLayout>
  )
}
