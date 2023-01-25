import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon, Button } from 'ui'

export default {
  title: 'Molecules/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Register',
  color: 'primary',
  disabled: false,
  variant: 'solid',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: 'Label',
  color: 'secondary',
  icon: 'circle-filled',
}

export const IconButton = Template.bind({})
IconButton.args = {
  color: 'secondary',
  icon: <Icon name="circle-filled" color="#fff" size="lg" />,
  size: 'sm',
}
