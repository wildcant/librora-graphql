import { Avatar, Link, Logo } from '@atoms'
import { Popover, Transition } from '@headlessui/react'
import { Button } from '@molecules'
import { useState } from 'react'
import { usePopper } from 'react-popper'

type NavItems = {
  title: string
  href: string
}[]

const isAuthenticated = false

export function Header() {
  const [isShowing, setIsShowing] = useState(false)
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
    <header className="flex w-full flex-col">
      <div className="container flex w-full flex-row justify-between self-center sm:px-0">
        <div className="flex w-full flex-row">
          {showNavigation && (
            <Button
              onClick={() => setIsShowing((showing) => !showing)}
              icon="menu"
              variant="unstyled"
              className="mr-2 lg:hidden"
            />
          )}

          <div className="flex w-full flex-row items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>

            <div className="flex flex-row items-center gap-2">
              <Link href="/sign-in" variant="button-outline">
                Sign In
              </Link>
              <Link href="/sign-up" variant="button">
                Sign Up
              </Link>
            </div>
          </div>

          {showNavigation && <DesktopNavigation navItems={navItems} />}
        </div>

        {isAuthenticated && (
          <Popover>
            <Popover.Button ref={setReferenceElement} className=" focus:outline-primary-light rounded-full">
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

      {showNavigation && <MobileNavigation isShowing={isShowing} navItems={navItems} />}
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

interface IMobileNavigationProps {
  navItems: NavItems
  isShowing: boolean
}

function MobileNavigation({ navItems, isShowing }: IMobileNavigationProps) {
  return (
    <nav className="lg:hidden">
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="lg:hidden"
      >
        <ul className="flex flex-col border-t">
          {navItems.map((navItem, idx) => (
            <li key={`mobile-nav-item-${idx}`} className="border-b-1 border-b text-xs">
              <Link href={navItem.href} className="block p-6 hover:bg-neutral-100">
                {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </Transition>
    </nav>
  )
}
