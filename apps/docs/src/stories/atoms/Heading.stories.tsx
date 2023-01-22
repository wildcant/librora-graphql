import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Heading } from 'ui'

export default {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {},
} as ComponentMeta<typeof Heading>

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Heading',
}
