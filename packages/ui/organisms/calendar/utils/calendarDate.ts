import { CalendarDate } from './internationalized'
import getDay from 'date-fns/getDay'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import { RangeValue } from '../types'

export const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function nativeDateToCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(getYear(date), getMonth(date), getDay(date))
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
