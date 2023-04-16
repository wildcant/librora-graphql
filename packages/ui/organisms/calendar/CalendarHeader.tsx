import { Icon } from '@atoms'
import { CalendarAria, VisuallyHidden, useDateFormatter } from 'react-aria'
import { CalendarState, RangeCalendarState } from 'react-stately'
import { CalendarButton } from './CalendarButton'

type ICalendarHeaderProps = Pick<CalendarAria, 'calendarProps' | 'prevButtonProps' | 'nextButtonProps'> & {
  state: CalendarState | RangeCalendarState
  displayTwoMonths?: boolean
}

export function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
  displayTwoMonths,
}: ICalendarHeaderProps) {
  const monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  })

  return (
    <div className="flex items-center py-4">
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <VisuallyHidden>
        <h2>{calendarProps['aria-label']}</h2>
      </VisuallyHidden>
      <CalendarButton {...prevButtonProps}>
        <Icon className="h-6 w-6" name="arrow-left" />
      </CalendarButton>
      <h2
        // We have a visually hidden heading describing the entire visible range,
        // and the calendar itself describes the individual month
        // so we don't need to repeat that here for screen reader users.
        aria-hidden
        className="align-center flex-1 text-center text-sm sm:text-md font-bold font-roboto"
      >
        {monthDateFormatter.format(state.visibleRange.start.toDate(state.timeZone))}
      </h2>
      {displayTwoMonths && (
        <h2 aria-hidden className="align-center flex-1 text-center text-sm sm:text-md font-bold font-roboto">
          {monthDateFormatter.format(state.visibleRange.start.add({ months: 1 }).toDate(state.timeZone))}
        </h2>
      )}
      <CalendarButton {...nextButtonProps}>
        <Icon className="h-6 w-6" name="arrow-right" />
      </CalendarButton>
    </div>
  )
}
