import { Avatar, Link, Logo } from '@atoms'
import { Popover } from '@headlessui/react'
import { Button } from '@molecules'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import { Search } from './components/Search'

type NavItems = {
  title: string
  href: string
}[]

const isAuthenticated = false

export function Header() {
  const [_isShowing, setIsShowing] = useState(false)
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
  })

  const navItems: NavItems = [
    { title: 'Find', href: '/find' },
    { title: 'Books', href: '/books' },
    { title: 'Reservations', href: '/reservations' },
  ]

  const showNavigation = isAuthenticated

  return (
    <header className="p-4">
      <div className="">
        <div hidden>
          <Link href="/" variant="unstyled">
            <Logo />
          </Link>
        </div>

        <Search />

        {showNavigation && (
          <Button
            onClick={() => setIsShowing((showing) => !showing)}
            icon="menu"
            variant="unstyled"
            className="mr-2 lg:hidden"
          />
        )}

        {showNavigation && <DesktopNavigation navItems={navItems} />}
      </div>

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
    </header>
  )
}

interface IDesktopNavigationProps {
  navItems: NavItems
}

function DesktopNavigation({ navItems }: IDesktopNavigationProps) {
  return (
    <nav className="hidden lg:flex lg:justify-center">
      <ul className="flex flex-row items-center">
        {navItems.map((navItem, idx) => (
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
