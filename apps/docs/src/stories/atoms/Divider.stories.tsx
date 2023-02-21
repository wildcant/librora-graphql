import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Divider } from 'ui'

export default {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = (args) => (
  <div className="flex h-96 flex-row">
    <Divider {...args} />
  </div>
)

export const Horizontal = Template.bind({})
Horizontal.args = {
  children: 'Or',
}

export const Vertical = Template.bind({})
Vertical.args = {
  isVertical: true,
  children: 'Or',
}
