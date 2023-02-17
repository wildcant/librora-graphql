import { CalendarDate, createCalendar, DateValue } from './utils/internationalized'
import { AriaRangeCalendarProps, useRangeCalendar } from '@react-aria/calendar'
import { useRangeCalendarState } from '@react-stately/calendar'
import { useRef } from 'react'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { RangeValue } from './types'
import {
  calendarDateToNativeDate,
  calendarRangeDateToNativeRangeDate,
  nativeDateToCalendarDate,
  nativeRangeDateToCalendarRangeDate,
} from './utils/calendarDate'
import { useDefaultLocale } from './utils/useDefaultLocale'
import { useDeviceType } from '@librora/utils/hooks'

export function AriaRangeCalendar(props: AriaRangeCalendarProps<DateValue>) {
  const { locale } = useDefaultLocale()
  const { isMobile } = useDeviceType()

  const displayTwoMonths = !isMobile

  const state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: displayTwoMonths ? 2 : 1 },
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const { calendarProps, prevButtonProps, nextButtonProps } = useRangeCalendar(props, state, ref)

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
        <CalendarGrid variant="date-range-picker" state={state} />
        {displayTwoMonths && (
          <CalendarGrid variant="date-range-picker" state={state} offset={{ months: 1 }} />
        )}
      </div>
    </div>
  )
}

interface ICalendarProps
  extends Omit<
    AriaRangeCalendarProps<DateValue>,
    | 'minValue'
    | 'maxValue'
    | 'isDateUnavailable'
    | 'focusedValue'
    | 'defaultFocusedValue'
    | 'value'
    | 'defaultValue'
    | 'onChange'
  > {
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
  value?: RangeValue<Date>
  /** The current value (controlled). */
  defaultValue?: RangeValue<Date>
  /** The default value (uncontrolled). */
  onChange?: (value: RangeValue<Date>) => void
}

function processRangeCalendarProps({
  minValue,
  maxValue,
  isDateUnavailable,
  focusedValue,
  defaultFocusedValue,
  value,
  defaultValue,
  onChange,
}: ICalendarProps): AriaRangeCalendarProps<DateValue> {
  return {
    minValue: minValue ? nativeDateToCalendarDate(minValue) : undefined,
    maxValue: maxValue ? nativeDateToCalendarDate(maxValue) : undefined,
    isDateUnavailable: isDateUnavailable
      ? (date) => isDateUnavailable(calendarDateToNativeDate(date as CalendarDate))
      : undefined,
    focusedValue: focusedValue ? nativeDateToCalendarDate(focusedValue) : undefined,
    defaultFocusedValue: defaultFocusedValue ? nativeDateToCalendarDate(defaultFocusedValue) : undefined,
    value: value ? nativeRangeDateToCalendarRangeDate(value) : undefined,
    defaultValue: defaultValue ? nativeRangeDateToCalendarRangeDate(defaultValue) : undefined,
    onChange: onChange
      ? (date) => onChange(calendarRangeDateToNativeRangeDate(date as RangeValue<CalendarDate>))
      : undefined,
  }
}

export function RangeCalendar(props: ICalendarProps) {
  return <AriaRangeCalendar {...processRangeCalendarProps(props)} />
}
