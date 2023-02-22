import { ReactNode } from 'react'
import { Header } from '../header/Header'
import { BaseLayout } from './BaseLayout'

interface IMainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <BaseLayout>
      <Header />
      <div className="container mx-auto h-full min-h-96 w-full">
        <div className="p-6 pb-16 md:py-0 md:px-0">{children}</div>
      </div>
    </BaseLayout>
  )
}
