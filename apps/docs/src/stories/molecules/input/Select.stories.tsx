import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import { ISelectProps, Option, Select, SelectField } from 'ui'
import { useForm } from 'react-hook-form'

export default {
  title: 'Molecules/Select',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>

const people: Option[] = [
  { value: '1', label: 'Wade Cooper' },
  { value: '2', label: 'Arlene Mccoy' },
  { value: '3', label: 'Devon Webb' },
  { value: '4', label: 'Tom Cook' },
  { value: '5', label: 'Tanya Fox' },
  { value: '6', label: 'Hellen Schmidt' },
]

function FunctionalSelect({ value, options, onChange, ...props }: ISelectProps) {
  const [selected, setSelected] = useState<Option>()
  return <Select value={selected} onChange={setSelected} options={people} {...props} />
}

const Template: ComponentStory<typeof Select> = (args) => <FunctionalSelect {...args} />

export const Default = Template.bind({})
Default.args = {
  options: people,
  defaultValue: people[2],
  label: 'Name',
}

export const InForm: ComponentStory<typeof Select> = () => {
  const { control, handleSubmit } = useForm<{ [key: string]: string }>()
  const displayError = () => {}
  return (
    <form onSubmit={handleSubmit(displayError)}>
      <SelectField
        options={people}
        label="Name"
        control={control}
        rules={{ required: 'This field is required' }}
        name="name"
      />

      <button type="submit">Submit</button>
    </form>
  )
}
