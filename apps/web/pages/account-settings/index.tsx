import { Avatar, Divider, Icon, Link } from '@atoms'
import { Button } from '@molecules'
import { MainLayout } from '~components/layouts/MainLayout'
import { useAuthState, useLogout } from '~store/auth'
import cn from 'classnames'

function capitalize(str?: string) {
  if (!str) return ''

  return str.charAt(0).toUpperCase() + str.slice(1)
}

function Mobile({ className }: { className?: string }) {
  const { user } = useAuthState()
  const { logout } = useLogout()
  return (
    <div className={className}>
      <h2 className="text-3xl">Profile</h2>
      <div className="mt-4 flex  flex-row items-center gap-2 pt-4">
        <div>
          <Avatar src="http://localhost:3000/avatar-placeholder.jpeg" className="w-14" />
        </div>
        <span className="text-3xl">{capitalize(user?.firstName)}</span>
      </div>

      <Divider className="mt-6" />

      <div className="mt-6 flex flex-row justify-between text-neutral-600">
        <div className="flex flex-row items-center gap-2 text-xl font-light">
          <Icon name="account-circle" />
          <span>Personal info</span>
        </div>
        <Icon name="arrow-right" />
      </div>

      <div className="mt-6 flex flex-row justify-between text-neutral-600">
        <div className="flex flex-row items-center gap-2 text-xl font-light">
          <Icon name="settings" />
          <span>Account</span>
        </div>
        <Icon name="arrow-right" />
      </div>

      <div className="mt-6 flex flex-row justify-between text-neutral-600">
        <div className="flex flex-row items-center gap-2 text-xl font-light">
          <Icon name="list-settings" />
          <span>Manage your books</span>
        </div>
        <Icon name="arrow-right" />
      </div>

      <Divider className="mt-6" />

      <div className="mt-8 flex flex-col justify-center">
        <Button variant="outline" size="sm" onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  )
}

function Desktop({ className }: { className?: string }) {
  const { user } = useAuthState()
  return (
    <div className={cn('mx-auto mt-6 max-w-screen-xl', className)}>
      <h2 className="text-3xl font-bold">Account</h2>
      <p className="mt-4 text-xl">
        <span className="font-normal">
          {capitalize(user?.firstName)} {capitalize(user?.lastName)}
        </span>
        , <span className="font-light">{user?.email}</span>
      </p>

      <div className="grid grid-cols-2 gap-24 lg:grid-cols-3">
        <div className="mt-8 rounded-md bg-white p-4 shadow-md">
          <Link href="/account-settings/personal-info">
            <div className="flex flex-col">
              <Icon name="profile" />
              <span>Personal info</span>
              <p>Provide personal details and how we can reach you</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

function AccountSettings() {
  return (
    <MainLayout>
      <Mobile className="md:hidden" />
      <Desktop className="hidden md:block" />
    </MainLayout>
  )
}

export default AccountSettings
