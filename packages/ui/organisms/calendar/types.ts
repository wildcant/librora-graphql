export type CalendarVariant = 'day-picker' | 'date-range-picker'

export interface RangeValue<T> {
  /** The start value of the range. */
  start: T
  /** The end value of the range. */
  end: T
}
