import { useLockBodyScroll } from '@librora/utils/hooks'
import classNames from 'classnames'
import { Loader, Toast } from 'ui'
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

export interface LayoutProps {
  children?: React.ReactNode
}

export function BaseLayout({ children }: LayoutProps) {
  const [{ isLoadingGlobal }] = useGlobalState()

  return (
    <>
      {isLoadingGlobal && <Loading />}
      <div className={classNames({ 'blur-sm': isLoadingGlobal })}>{children}</div>
      <Toast />
    </>
  )
}
