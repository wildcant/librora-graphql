import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Divider } from 'ui'

export default {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = (args) => <Divider {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Or',
}
