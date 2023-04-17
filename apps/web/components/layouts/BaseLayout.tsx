import { useLockBodyScroll } from '@librora/utils/hooks'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { EIconName, Icon, Link, Loader, Toast } from 'ui'
import { BookDetailsActions } from '~components/pages/BookingDetails/Actions'
import { useAuthFlags } from '~store/auth'
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

type Route = { href: string; iconName: `${EIconName}`; label: string }
function NavigationLink(route: Route) {
  const router = useRouter()

  return (
    <Link
      key={route.href}
      href={route.href}
      variant="unstyled"
      className="flex flex-col items-center text-neutral-500"
    >
      <Icon
        name={route.iconName}
        size="lg"
        className={cn({
          'text-primary-400': router.pathname === route.href,
          'text-neutral-400': router.pathname !== route.href,
        })}
      />
      <span
        className={cn('text-[10px] font-bold', {
          'text-neutral-800': router.pathname === route.href,
          'text-neutral-400': router.pathname !== route.href,
        })}
      >
        {route.label}
      </span>
    </Link>
  )
}

function DefaultPublicActions() {
  const routes: Route[] = [
    { href: '/', iconName: 'search', label: 'Explore' },
    { href: '/sign-in', iconName: 'account-circle', label: 'Sign in' },
  ]

  return (
    <div className="flex h-full flex-row items-center gap-10">
      {routes.map((route) => (
        <NavigationLink key={route.href} {...route} />
      ))}
    </div>
  )
}

function DefaultPrivateActions() {
  const routes: Route[] = [
    { href: '/', iconName: 'search', label: 'Explore' },
    // { href: '/inbox', iconName: 'chat', label: 'Inbox' },
    { href: '/account-settings', iconName: 'account-circle', label: 'Profile' },
  ]

  return (
    <div className="flex h-full flex-row items-center gap-10">
      {routes.map((route) => (
        <NavigationLink key={route.href} {...route} />
      ))}
    </div>
  )
}

const publicPageActions: { [key: string]: JSX.Element } = {
  '/books/[slug]': <BookDetailsActions />,
  default: <DefaultPublicActions />,
}

const privatePageActions: { [key: string]: JSX.Element } = {
  '/books/[slug]': <BookDetailsActions />,
  default: <DefaultPrivateActions />,
}

function MobileNavigation() {
  const router = useRouter()
  const { isAuthenticated } = useAuthFlags()
  const pageActions = isAuthenticated ? privatePageActions : publicPageActions

  return (
    <nav className="fixed bottom-0 z-[8999] flex h-16 w-full justify-center border-t-[1px] border-t-neutral-100 bg-white md:hidden">
      {pageActions[router.route] ?? pageActions.default}
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
      <div className={cn({ 'blur-sm': isLoadingGlobal })}>
        {children}
        <MobileNavigation />
      </div>
      <Toast />
    </>
  )
}
