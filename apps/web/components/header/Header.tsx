import { Popover } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import { Avatar, Button, Divider, Icon, Link, Logo } from 'ui'
import { useAuthFlags, useLogout } from '~store/auth'
import { Search } from './components/Search'

type NavItem = {
  label: string
  href: string
  routes: string[]
  private: boolean
}

const navItems: NavItem[] = [
  { label: 'Switch to lending', href: '/lending', routes: ['/', '/account-settings'], private: true },
]

type MenuItem = {
  label: string
  href: string
}

const privateMenuItems: MenuItem[] = [{ label: 'Account', href: '/account-settings' }]
const publicMenuItems: MenuItem[] = [
  { label: 'Sign up', href: '/sign-up' },
  { label: 'Sign in', href: '/sign-in' },
]

function useNavigationItems() {
  const router = useRouter()
  const { isAuthenticated } = useAuthFlags()

  let activeNavItems = navItems.filter((item) => item.routes.some((route) => route === router.pathname))
  if (isAuthenticated) activeNavItems = activeNavItems.filter((item) => item.private)
  else activeNavItems = activeNavItems.filter((item) => !item.private)

  return { activeNavItems }
}

export function Header() {
  const router = useRouter()
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  })
  const { isAuthenticated } = useAuthFlags()
  const { logout } = useLogout()
  const { activeNavItems } = useNavigationItems()
  const showNavigation = isAuthenticated

  return (
    <div className="container mx-auto hidden md:block">
      <header className="p-2 md:px-0 md:pt-8">
        <div className="md:flex md:flex-row md:justify-between">
          <div className="hidden md:block">
            <Link href="/" variant="unstyled">
              <Logo />
            </Link>
          </div>

          {router.pathname === '/' && (
            <Search containerClassName="hidden md:block md:flex-1" className="md:mx-auto md:max-w-md" />
          )}

          <div className="flex flex-row items-center">
            {showNavigation && <Navigation navItems={activeNavItems} />}

            {!isAuthenticated && (
              <Popover>
                <Popover.Button
                  ref={setReferenceElement}
                  className=" focus:outline-primary-200 hidden rounded-full md:block"
                >
                  <Icon name="account-circle-fill" size="2xl" />
                </Popover.Button>
                <Popover.Panel
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                  className="z-20 mt-2 rounded-lg bg-white shadow-xl"
                >
                  <div className="grid w-40 grid-cols-1">
                    {publicMenuItems.map((menuItem) => (
                      <Link
                        color="neutral"
                        key={menuItem.href}
                        href={menuItem.href}
                        className="py-3 px-4 text-neutral-900 hover:bg-neutral-50"
                      >
                        {menuItem.label}
                      </Link>
                    ))}
                  </div>
                </Popover.Panel>
              </Popover>
            )}

            {isAuthenticated && (
              <Popover>
                <Popover.Button ref={setReferenceElement} className=" focus:outline-primary-200 rounded-full">
                  <Avatar src="http://localhost:3000/avatar-placeholder.jpeg" />
                </Popover.Button>
                <Popover.Panel
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                  className="mt-2 rounded-lg bg-white  shadow-xl"
                >
                  <div className="grid w-40 grid-cols-1 py-2">
                    {privateMenuItems.map((menuItem) => (
                      <Link
                        key={menuItem.href}
                        href={menuItem.href}
                        className="py-3 px-4 text-neutral-900 hover:bg-neutral-50"
                      >
                        {menuItem.label}
                      </Link>
                    ))}
                    <Divider />
                    <Button
                      variant="unstyled"
                      className="font-plusjakartasans py-3 px-4 text-left hover:bg-neutral-50"
                      size="sm"
                      onClick={logout}
                    >
                      Log out
                    </Button>
                  </div>
                </Popover.Panel>
              </Popover>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

type NavigationProps = {
  navItems: NavItem[]
}

function Navigation(props: NavigationProps) {
  return (
    <nav className="hidden lg:flex lg:justify-center">
      <ul className="flex flex-row items-center">
        {props.navItems.map((navItem, idx) => (
          <li key={`desktop-nav-item-${idx}`}>
            <Link href={navItem.href} className="block p-4 hover:bg-neutral-100">
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
