import { ReactNode } from 'react'
import { Icon, Link } from 'ui'
import { Header } from '../header/Header'
import { BaseLayout } from './BaseLayout'

function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 h-16 w-full border-t-[1px] border-t-neutral-100 flex justify-center bg-white">
      <div className="flex flex-row items-center h-full gap-10">
        <Link href="/" variant="unstyled" className="flex flex-col items-center text-neutral-500">
          <Icon name="search" size="lg" />
          <span className="text-[10px] font-bold">Explore</span>
        </Link>

        <Link href="/sign-in" variant="unstyled" className="flex flex-col items-center text-neutral-500">
          <Icon name="account-circle" size="lg" />
          <span className="text-[10px] font-bold">Sign in</span>
        </Link>
      </div>
    </nav>
  )
}

interface IMainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <BaseLayout>
      <Header />
      <div className="h-full min-h-screen w-full container mx-auto p-6 pb-16">{children}</div>
      <MobileNavigation />
    </BaseLayout>
  )
}
