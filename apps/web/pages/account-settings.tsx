import { Avatar, Divider, Icon } from '@atoms'
import { Button } from '@molecules'
import { MainLayout } from '~components/layouts/MainLayout'
import { useAuthState, useLogout } from '~store/auth'

function capitalize(str?: string) {
  if (!str) return ''

  return str.charAt(0).toUpperCase() + str.slice(1)
}

function AccountSettings() {
  const { user } = useAuthState()
  const { logout } = useLogout()

  return (
    <MainLayout>
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
    </MainLayout>
  )
}

export default AccountSettings
