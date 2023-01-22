import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Link } from 'ui'

export default {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {},
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Label',
  variant: 'button',
}
