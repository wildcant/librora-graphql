import { Icon } from '@atoms'
import { Popover } from '@headlessui/react'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { AriaDateRangePickerProps, useDateRangePicker } from 'react-aria'
import { usePopper } from 'react-popper'
import { useDateRangePickerState } from 'react-stately'
import { DateField } from './DateField'
import { AriaRangeCalendar } from './RangeCalendar'
import { RangeValue } from './types'
import {
  calendarDateToNativeDate,
  calendarRangeDateToNativeRangeDate,
  nativeDateToCalendarDate,
  nativeRangeDateToCalendarRangeDate,
} from './utils/calendarDate'
import { CalendarDate, DateValue } from './utils/internationalized'

function AriaDateRangePicker(props: AriaDateRangePickerProps<DateValue>) {
  const ref = useRef<HTMLDivElement>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom-end' })

  const state = useDateRangePickerState(props)
  const { groupProps, labelProps, startFieldProps, endFieldProps, calendarProps } = useDateRangePicker(
    props,
    state,
    ref
  )

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="flex group">
        <div
          className={classNames(
            'flex bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-1',
            { 'border-red-500 ring-red-500': state.validationState }
          )}
        >
          <DateField {...startFieldProps} />
          <span aria-hidden="true" className="md:px-2">
            –
          </span>
          <DateField {...endFieldProps} />
        </div>
        <Popover>
          {({ open, close }) => (
            <>
              <Popover.Button
                ref={setReferenceElement}
                className={classNames(
                  'px-2 -ml-px border transition-colors rounded-r-md group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 outline-none h-full',
                  {
                    'bg-gray-200 border-gray-400': open,
                    'bg-gray-50 border-gray-300 group-hover:border-gray-400': !open,
                    'border-red-500 ring-red-500': state.validationState,
                  }
                )}
              >
                <Icon name="calendar" className="w-5 h-5 text-gray-700 group-focus-within:text-violet-700" />
              </Popover.Button>
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="mt-2 rounded-lg bg-white p-2 shadow-xl absolute"
              >
                <AriaRangeCalendar
                  {...calendarProps}
                  onChange={(e) => {
                    calendarProps.onChange?.(e)
                    setTimeout(() => close(), 100)
                  }}
                />
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>
      {state.validationState && <span className="text-sm text-red-500 ">Invalid date rage.</span>}
    </div>
  )
}

function processDateRangePickerProps({
  minValue,
  maxValue,
  isDateUnavailable,
  placeholderValue,
  value,
  defaultValue,
  onChange,
}: DateRangePickerProps): AriaDateRangePickerProps<DateValue> {
  return {
    minValue: minValue ? nativeDateToCalendarDate(minValue) : undefined,
    maxValue: maxValue ? nativeDateToCalendarDate(maxValue) : undefined,
    isDateUnavailable: isDateUnavailable
      ? (date) => isDateUnavailable(calendarDateToNativeDate(date as CalendarDate))
      : undefined,
    placeholderValue: placeholderValue ? nativeDateToCalendarDate(placeholderValue) : undefined,
    value: value ? nativeRangeDateToCalendarRangeDate(value) : undefined,
    defaultValue: defaultValue ? nativeRangeDateToCalendarRangeDate(defaultValue) : undefined,
    onChange: onChange
      ? (date) => onChange(calendarRangeDateToNativeRangeDate(date as RangeValue<CalendarDate>))
      : undefined,
  }
}

type DateRangePickerProps = Omit<
  AriaDateRangePickerProps<DateValue>,
  'minValue' | 'maxValue' | 'isDateUnavailable' | 'placeholderValue' | 'value' | 'defaultValue' | 'onChange'
> & {
  /** The minimum allowed date that a user may select. */
  minValue?: Date
  /** The maximum allowed date that a user may select. */
  maxValue?: Date
  /** The maximum allowed date that a user may select. */
  isDateUnavailable?: (date: Date) => boolean
  /** Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. */
  placeholderValue?: Date
  /** The element's unique identifier. See MDN. */
  value?: RangeValue<Date>
  /** The current value (controlled). */
  defaultValue?: RangeValue<Date>
  /** The default value (uncontrolled). */
  onChange?: (value: RangeValue<Date>) => void
}

export function DateRangePicker(props: DateRangePickerProps) {
  return <AriaDateRangePicker {...processDateRangePickerProps(props)} />
}
