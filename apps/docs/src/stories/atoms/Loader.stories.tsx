import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Loader } from 'ui'

export default {
  title: 'Atoms/Loader',
  component: Loader,
  argTypes: {},
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />

export const Default = Template.bind({})
Default.args = {
  color: 'primary',
  size: 'xl',
}
