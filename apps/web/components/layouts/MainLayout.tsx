import { ReactNode } from 'react'
import { BaseLayout } from './BaseLayout'

interface IMainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <BaseLayout>
      <div className="bg-secondary-50 h-full min-h-screen w-full bg-[url('../public/noise.png')]">
        <div className="container mx-auto min-h-screen p-6 lg:px-0 lg:py-6">{children}</div>
      </div>
    </BaseLayout>
  )
}
