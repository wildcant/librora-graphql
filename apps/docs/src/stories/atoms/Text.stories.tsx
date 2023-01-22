import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Text } from 'ui'

export default {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {},
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Text',
}
