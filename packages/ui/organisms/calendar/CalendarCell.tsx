import { useRef } from 'react'
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria'
import { CalendarState, RangeCalendarState } from 'react-stately'
import { CalendarVariant } from './types'
import { CalendarDate, DateValue, getDayOfWeek, isSameDay, isSameMonth } from './utils/internationalized'
import { useDefaultLocale } from './utils/useDefaultLocale'

type ICalendarCellProps = {
  date: DateValue
  currentMonth: DateValue
  variant: CalendarVariant
} & (
  | { variant: 'day-picker'; state: CalendarState }
  | { variant: 'date-range-picker'; state: RangeCalendarState }
)

export function CalendarCell({ variant, state, date, currentMonth }: ICalendarCellProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } = useCalendarCell(
    { date: date as unknown as CalendarDate },
    state,
    ref
  )

  const isOutsideMonth = !isSameMonth(currentMonth, date)

  let isSelectionStart
  let isSelectionEnd
  if (variant === 'date-range-picker') {
    // The start and end date of the selected range will have
    // an emphasized appearance.
    isSelectionStart = state.highlightedRange ? isSameDay(date, state.highlightedRange.start) : isSelected
    isSelectionEnd = state.highlightedRange ? isSameDay(date, state.highlightedRange.end) : isSelected
  }

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useDefaultLocale()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dayOfWeek = getDayOfWeek(date, locale)
  const isRoundedLeft = isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1)
  const isRoundedRight =
    isSelected && (isSelectionEnd || dayOfWeek === 6 || date.day === date.calendar.getDaysInMonth(date))

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <td {...cellProps} className={`relative z-0 py-0.5 focus-visible:z-10`}>
      <div
        {...buttonProps}
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className={`group h-12 w-12 outline-none lg:h-10 lg:w-10 ${isRoundedLeft ? 'rounded-l-full' : ''} ${
          isRoundedRight ? 'rounded-r-full' : ''
        } ${isSelected ? 'bg-primary-200' : ''} ${isDisabled ? 'disabled' : ''}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center rounded-full ${
            isDisabled ? 'text-gray-400' : ''
          }
          ${
            // Focus ring, visible while the cell has keyboard focus.
            isFocusVisible ? 'group-focus:z-2 ring-2 ring-violet-600 ring-offset-2' : ''
          }
          ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd ? 'bg-primary-600 hover:bg-primary-700 text-white' : ''
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !(isSelectionStart || isSelectionEnd) ? 'hover:bg-primary-400' : ''
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? 'hover:bg-primary-100' : ''
          }  cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  )
}
