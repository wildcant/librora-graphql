import { useLockBodyScroll } from '@librora/utils/hooks'
import classNames from 'classnames'
import { Icon, Link, Loader, Toast } from 'ui'
import { useGlobalState } from '../../store/global'
import { Portal } from '../Portal'

function Loading() {
  useLockBodyScroll()
  return (
    <Portal>
      <div className="fixed top-0 right-0 left-0 flex h-full items-center justify-center">
        <Loader size="xl" />
      </div>
    </Portal>
  )
}

function MobileNavigation() {
  return (
    <nav className="fixed bottom-0 flex h-16 w-full justify-center border-t-[1px] border-t-neutral-100 bg-white md:hidden">
      <div className="flex h-full flex-row items-center gap-10">
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

export type LayoutProps = {
  children?: React.ReactNode
}

export function BaseLayout({ children }: LayoutProps) {
  const [{ isLoadingGlobal }] = useGlobalState()

  return (
    <>
      {isLoadingGlobal && <Loading />}
      <div className={classNames({ 'blur-sm': isLoadingGlobal })}>
        {children}
        <MobileNavigation />
      </div>
      <Toast />
    </>
  )
}
