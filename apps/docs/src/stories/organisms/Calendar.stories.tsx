import { ComponentMeta, ComponentStory } from '@storybook/react'
import add from 'date-fns/add'
import {
  Calendar,
  DatePicker as DatePickerComponent,
  DateRangePicker as DateRangePickerComponent,
  RangeCalendar as RangeCalendarComponent,
} from 'ui'

export default {
  title: 'Organisms/Calendar',
  component: Calendar,
  argTypes: {},
} as ComponentMeta<typeof Calendar>

const CalendarTemplate: ComponentStory<typeof Calendar> = (args) => <Calendar {...args} />

export const BaseCalendar = CalendarTemplate.bind({})
const today = new Date()
BaseCalendar.args = {
  minValue: today,
  defaultValue: today,
}

const RangeCalendarTemplate: ComponentStory<typeof RangeCalendarComponent> = (args) => (
  <RangeCalendarComponent {...args} />
)
export const RangeCalendar = RangeCalendarTemplate.bind({})
RangeCalendar.args = {
  minValue: today,
  defaultValue: {
    start: today,
    end: add(today, { weeks: 2 }),
  },
}

const DatePickerTemplate: ComponentStory<typeof DatePickerComponent> = (args) => (
  <DatePickerComponent {...args} />
)
export const DatePicker = DatePickerTemplate.bind({})
DatePicker.args = {
  label: 'Reservation date',
  minValue: today,
}

const DateRangePickerTemplate: ComponentStory<typeof DateRangePickerComponent> = (args) => (
  <DateRangePickerComponent {...args} />
)
export const DateRangePicker = DateRangePickerTemplate.bind({})
DateRangePicker.args = {
  label: 'Reservation date',
  minValue: today,
}
