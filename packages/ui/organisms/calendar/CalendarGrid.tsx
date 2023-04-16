import { useCalendarGrid } from 'react-aria'
import { CalendarState, RangeCalendarState } from 'react-stately'
import { CalendarCell } from './CalendarCell'
import { CalendarVariant } from './types'
import { DateDuration, endOfMonth, getWeeksInMonth } from './utils/internationalized'
import { useDefaultLocale } from './utils/useDefaultLocale'

type ICalendarGridProps = {
  offset?: DateDuration
  variant: CalendarVariant
} & (
  | { variant: 'day-picker'; state: CalendarState }
  | { variant: 'date-range-picker'; state: RangeCalendarState }
)

export function CalendarGrid({ variant, state, offset = {} }: ICalendarGridProps) {
  const { locale } = useDefaultLocale()
  const startDate = state.visibleRange.start.add(offset)
  const endDate = endOfMonth(startDate)
  const { gridProps, headerProps, weekDays } = useCalendarGrid({ startDate, endDate }, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = new Array(getWeeksInMonth(startDate, locale))

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...weeksInMonth.keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  variant === 'day-picker' ? (
                    <CalendarCell
                      key={i}
                      variant="day-picker"
                      state={state as CalendarState}
                      date={date}
                      currentMonth={startDate}
                    />
                  ) : (
                    <CalendarCell
                      key={i}
                      variant="date-range-picker"
                      state={state as RangeCalendarState}
                      date={date}
                      currentMonth={startDate}
                    />
                  )
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
