import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Autocomplete, AutocompleteField, Option } from 'ui'

export default {
  title: 'Molecules/Autocomplete',
  component: Autocomplete,
  argTypes: {},
} as ComponentMeta<typeof Autocomplete>

const people: Option<string>[] = [
  { value: '1', label: 'Wade Cooper' },
  { value: '2', label: 'Arlene Mccoy' },
  { value: '3', label: 'Devon Webb' },
  { value: '4', label: 'Tom Cook' },
  { value: '5', label: 'Tanya Fox' },
  { value: '6', label: 'Hellen Schmidt' },
]

const Template: ComponentStory<typeof Autocomplete> = (args) => <Autocomplete {...args} />

export const Default = Template.bind({})
Default.args = {
  multiple: false,
  options: people,
  defaultValue: people[2],
  label: 'Search People',
}

export const Disabled = Template.bind({})
Disabled.args = {
  multiple: false,
  options: people,
  label: 'Search People',
  disabled: true,
}

export const MultiSelect = Template.bind({})
MultiSelect.args = {
  options: people,
  multiple: true,
  defaultValue: [people[0], people[1]],
  label: 'Search People',
}

export const InForm: ComponentStory<typeof Autocomplete> = () => {
  const { control, handleSubmit } = useForm<{ [key: string]: string }>()

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <AutocompleteField
        options={people}
        label="person"
        control={control}
        rules={{ required: 'This field is required' }}
        name="name"
        multiple={true}
      />

      <button type="submit">Submit</button>
    </form>
  )
}
