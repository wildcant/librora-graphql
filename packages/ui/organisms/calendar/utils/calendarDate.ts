import { CalendarDate, DateValue } from './internationalized'
import format from 'date-fns/format'

import { RangeValue } from '../types'

export const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function nativeDateToCalendarDate(date: Date): DateValue {
  return new CalendarDate(
    parseInt(format(date, 'yyyy'), 10),
    parseInt(format(date, 'MM'), 10),
    parseInt(format(date, 'dd'), 10)
  ) as unknown as DateValue
}

export function calendarDateToNativeDate(date: DateValue, timezone = defaultTimeZone): Date {
  return date.toDate(timezone)
}

export function nativeRangeDateToCalendarRangeDate(value: RangeValue<Date>): RangeValue<DateValue> {
  return { start: nativeDateToCalendarDate(value.start), end: nativeDateToCalendarDate(value.end) }
}

export function calendarRangeDateToNativeRangeDate(value: RangeValue<DateValue>): RangeValue<Date> {
  return { start: calendarDateToNativeDate(value.start), end: calendarDateToNativeDate(value.end) }
}
