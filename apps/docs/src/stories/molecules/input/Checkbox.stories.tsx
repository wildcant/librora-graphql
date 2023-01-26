import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'

import { CheckboxField, ICheckboxFieldProps } from 'ui'
import { useForm } from 'react-hook-form'

export default {
  title: 'Molecules/CheckboxField',
  component: CheckboxField,
  argTypes: {},
} as ComponentMeta<typeof CheckboxField>

const Template: ComponentStory<typeof CheckboxField> = ({ name, control: c, ...args }) => {
  const { control } = useForm<{ [key: string]: string }>()
  return (
    <CheckboxField
      control={control}
      name={name || 'name'}
      rules={{ required: 'This field is required' }}
      {...args}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Click here',
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Click here',
  disabled: true,
}

export const InForm: ComponentStory<typeof CheckboxField> = () => {
  const { control, handleSubmit } = useForm<{ ch: boolean }>({
    defaultValues: {
      ch: true,
    },
  })
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <CheckboxField
        control={control}
        name={'ch'}
        label={'Click here'}
        rules={{ required: 'This field is required' }}
        defaultValue={true}
      />

      <button type="submit">Submit</button>
    </form>
  )
}
