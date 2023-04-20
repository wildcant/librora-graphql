import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Button } from '@molecules'
import { MainLayout } from '~components/layouts/MainLayout'

export default function PersonalInfo() {
  return (
    <MainLayout>
      <Breadcrumb>
        <BreadcrumbLink href="/account-settings">Account</BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Personal Info</BreadcrumbItem>
      </Breadcrumb>

      <h1>Personal Info</h1>
      <br />
      <div className="flex flex-row">
        <span>Name</span>
        <Button variant="link" color="neutral" underline>
          Edit
        </Button>
      </div>
    </MainLayout>
  )
}
