import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Progress } from 'ui'

export default {
  title: 'Atoms/Progress',
  component: Progress,
  argTypes: {},
} as ComponentMeta<typeof Progress>

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />

export const Default = Template.bind({})
Default.args = {}
