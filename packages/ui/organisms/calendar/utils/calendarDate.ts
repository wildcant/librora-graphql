import { CalendarDate } from './internationalized'
import format from 'date-fns/format'

import { RangeValue } from '../types'

export const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function nativeDateToCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(
    parseInt(format(date, 'yyyy'), 10),
    parseInt(format(date, 'MM'), 10),
    parseInt(format(date, 'dd'), 10)
  )
}

export function calendarDateToNativeDate(date: CalendarDate, timezone = defaultTimeZone): Date {
  return date.toDate(timezone)
}

export function nativeRangeDateToCalendarRangeDate(value: RangeValue<Date>): RangeValue<CalendarDate> {
  return { start: nativeDateToCalendarDate(value.start), end: nativeDateToCalendarDate(value.end) }
}

export function calendarRangeDateToNativeRangeDate(value: RangeValue<CalendarDate>): RangeValue<Date> {
  return { start: calendarDateToNativeDate(value.start), end: calendarDateToNativeDate(value.end) }
}
