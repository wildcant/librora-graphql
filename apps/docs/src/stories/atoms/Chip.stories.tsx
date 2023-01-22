import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Chip } from 'ui'

export default {
  title: 'Atoms/Chip',
  component: Chip,
  argTypes: {},
} as ComponentMeta<typeof Chip>

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'chip',
  color: 'primary',
  variant: 'solid',
}
