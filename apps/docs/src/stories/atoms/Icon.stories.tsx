import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon } from 'ui'

export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  size: 'lg',
  name: 'fallback',
}

export const Medium = Template.bind({})
Medium.args = {
  size: 'md',
  name: 'check',
}
