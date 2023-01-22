import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Icon, Badge } from 'ui'

export default {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {},
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <div className="h-12 w-12 rounded-sm bg-slate-200"></div>,
  color: 'primary',
  variant: 'solid',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: <Icon name="circle-filled" size="lg" />,
  color: 'primary',
  variant: 'solid',
  content: 2,
}

export const WithText = Template.bind({})
WithText.args = {
  children: 'Hello People',
  color: 'primary',
  variant: 'solid',
  content: 'free',
}
