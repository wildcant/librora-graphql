import { ReactNode } from 'react'
import { Header } from '../header/Header'
import { BaseLayout } from './BaseLayout'
import { Divider } from '@atoms'

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <BaseLayout>
      <Header />
      <Divider />
      <br />
      <div className="min-h-96 container mx-auto h-full w-full">
        <div className="p-6 pb-16 md:py-0 md:px-0">{children}</div>
      </div>
    </BaseLayout>
  )
}
