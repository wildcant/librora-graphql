import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'ui'

export default {
  title: 'Organisms/Breadcrumb',
  component: Breadcrumb,
  argTypes: {},
} as ComponentMeta<typeof Breadcrumb>

const Template: ComponentStory<typeof Breadcrumb> = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbLink href="/collections">All Books</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>History</BreadcrumbItem>
  </Breadcrumb>
)

export const Default = Template.bind({})
Default.args = {}
