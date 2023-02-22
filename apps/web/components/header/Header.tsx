import { Avatar, Icon, Link, Logo } from 'ui'
import { Popover } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import { Search } from './components/Search'
import { useRouter } from 'next/router'

type NavItems = {
  title: string
  href: string
}[]

const isAuthenticated = false

const navItems: NavItems = [
  { title: 'Books', href: '/books' },
  { title: 'Reservations', href: '/reservations' },
]

// const authMenuItems: NavItems = []
const publicMenuItems: NavItems = [
  { title: 'Sign up', href: '/sign-up' },
  { title: 'Sign in', href: '/sign-in' },
]

export function Header() {
  const router = useRouter()
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  })

  const showNavigation = isAuthenticated

  return (
    <div className="container mx-auto hidden md:block">
      <header className="p-6 md:pt-8 md:pb-4 md:px-0">
        <div className="md:flex md:flex-row md:justify-between">
          <div className="hidden md:block">
            <Link href="/" variant="unstyled">
              <Logo />
            </Link>
          </div>

          {router.pathname === '/' && (
            <Search containerClassName="hidden md:block md:flex-1" className="md:mx-auto md:max-w-md" />
          )}

          {showNavigation && <Navigation navItems={navItems} />}

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
                className="z-20 mt-2 rounded-lg bg-white p-2 shadow-xl"
              >
                <div className="grid w-40 grid-cols-1">
                  {publicMenuItems.map((menuItem) => (
                    <Link href={menuItem.href} className="py-3 px-4 text-neutral-900">
                      {menuItem.title}
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
                className="mt-2 rounded-lg bg-white p-2 shadow-xl"
              >
                <div className="grid w-40 grid-cols-1">
                  <a href="/analytics">Profile</a>
                  <a href="/integrations">Sign out</a>
                </div>
              </Popover.Panel>
            </Popover>
          )}
        </div>
      </header>
    </div>
  )
}

interface INavigationProps {
  navItems: NavItems
}

function Navigation(props: INavigationProps) {
  return (
    <nav className="hidden lg:flex lg:justify-center">
      <ul className="flex flex-row items-center">
        {props.navItems.map((navItem, idx) => (
          <li key={`desktop-nav-item-${idx}`}>
            <Link href={navItem.href} className="block p-4 hover:bg-neutral-100">
              {navItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
