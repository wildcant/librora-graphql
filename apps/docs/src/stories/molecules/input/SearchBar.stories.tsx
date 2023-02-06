import { ComponentStory, ComponentMeta } from '@storybook/react'

import { SearchBar } from 'ui'
import { useForm } from 'react-hook-form'

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = ({ name, control: _c, ...args }) => {
  const { control } = useForm<{ [key: string]: string }>()
  return (
    <SearchBar
      control={control}
      name={name || 'name'}
      rules={{ required: 'This field is required' }}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Name',
  name: 'name',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Disabled',
  name: 'disabled',
  disabled: true,
}

export const InForm: ComponentStory<typeof SearchBar> = () => {
  const { control, handleSubmit } = useForm<{ [key: string]: string }>()

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <SearchBar control={control} name={'search'} />
      <button type="submit">Submit</button>
    </form>
  )
}
