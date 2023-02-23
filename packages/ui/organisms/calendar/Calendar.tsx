import { useDeviceType } from '@librora/utils/hooks'
import { AriaCalendarProps, useCalendar } from '@react-aria/calendar'
import { useCalendarState } from '@react-stately/calendar'
import { useRef } from 'react'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { calendarDateToNativeDate, nativeDateToCalendarDate } from './utils/calendarDate'
import { CalendarDate, createCalendar, DateValue } from './utils/internationalized'
import { useDefaultLocale } from './utils/useDefaultLocale'

export function AriaCalendar(props: AriaCalendarProps<DateValue>) {
  const { locale } = useDefaultLocale()
  const { isMobile } = useDeviceType()

  const displayTwoMonths = !isMobile
  const state = useCalendarState({
    ...props,
    visibleDuration: { months: displayTwoMonths ? 2 : 1 },
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state)

  // To avoid flickering.
  if (typeof isMobile === 'undefined') {
    return <></>
  }

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
        displayTwoMonths={displayTwoMonths}
      />
      <div className="flex gap-8">
        <CalendarGrid variant="day-picker" state={state} />
        {displayTwoMonths && <CalendarGrid variant="day-picker" state={state} offset={{ months: 1 }} />}
      </div>
    </div>
  )
}

type CalendarProps = Omit<
  AriaCalendarProps<DateValue>,
  | 'minValue'
  | 'maxValue'
  | 'isDateUnavailable'
  | 'focusedValue'
  | 'defaultFocusedValue'
  | 'value'
  | 'defaultValue'
  | 'onChange'
> & {
  /** The minimum allowed date that a user may select. */
  minValue?: Date
  /** The maximum allowed date that a user may select. */
  maxValue?: Date
  /** The maximum allowed date that a user may select. */
  isDateUnavailable?: (date: Date) => boolean
  /** Whether to automatically focus the calendar when it mounts. */
  focusedValue?: Date
  /** The date that is focused when the calendar first mounts (uncountrolled). */
  defaultFocusedValue?: Date
  /** The element's unique identifier. See MDN. */
  value?: Date
  /** The current value (controlled). */
  defaultValue?: Date
  /** The default value (uncontrolled). */
  onChange?: (value: Date) => void
}

function processCalendarProps({
  minValue,
  maxValue,
  isDateUnavailable,
  focusedValue,
  defaultFocusedValue,
  value,
  defaultValue,
  onChange,
}: CalendarProps): AriaCalendarProps<DateValue> {
  return {
    minValue: minValue ? nativeDateToCalendarDate(minValue) : undefined,
    maxValue: maxValue ? nativeDateToCalendarDate(maxValue) : undefined,
    isDateUnavailable: isDateUnavailable
      ? (date) => isDateUnavailable(calendarDateToNativeDate(date as CalendarDate))
      : undefined,
    focusedValue: focusedValue ? nativeDateToCalendarDate(focusedValue) : undefined,
    defaultFocusedValue: defaultFocusedValue ? nativeDateToCalendarDate(defaultFocusedValue) : undefined,
    value: value ? nativeDateToCalendarDate(value) : undefined,
    defaultValue: defaultValue ? nativeDateToCalendarDate(defaultValue) : undefined,
    onChange: onChange ? (date) => onChange(calendarDateToNativeDate(date as CalendarDate)) : undefined,
  }
}

export function Calendar(props: CalendarProps) {
  return <AriaCalendar {...processCalendarProps(props)} />
}
