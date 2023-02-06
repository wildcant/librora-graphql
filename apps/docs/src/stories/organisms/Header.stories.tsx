import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Header } from 'ui'

export default {
  title: 'Organisms/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {}
