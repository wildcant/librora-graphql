import { Icon } from '@atoms'
import { Popover } from '@headlessui/react'
import { CalendarDate } from './utils/internationalized'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'
import { AriaDatePickerProps, DateValue } from '@react-types/datepicker'
import { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { AriaCalendar } from './Calendar'
import { DateField } from './DateField'
import { calendarDateToNativeDate, nativeDateToCalendarDate } from './utils/calendarDate'

function AriaDatePicker(props: AriaDatePickerProps<DateValue>) {
  const state = useDatePickerState(props)
  const ref = useRef<HTMLDivElement>(null)
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom' })

  const { groupProps, labelProps, fieldProps, calendarProps } = useDatePicker(props, state, ref)

  return (
    <div className="relative inline-flex flex-col text-left">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="flex group">
        <div className="bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md pr-10 group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-1 relative flex items-center">
          <DateField {...fieldProps} />
          {state.validationState === 'invalid' && (
            <Icon name="error-warning" className="w-6 h-6 text-red-500 absolute right-1" />
          )}
        </div>
        <Popover>
          {({ open, close }) => (
            <>
              <Popover.Button
                ref={setReferenceElement}
                className={`px-2 -ml-px border transition-colors rounded-r-md group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 outline-none h-full ${
                  open
                    ? 'bg-gray-200 border-gray-400'
                    : 'bg-gray-50 border-gray-300 group-hover:border-gray-400'
                }`}
              >
                <Icon name="calendar" className="w-5 h-5 text-gray-700 group-focus-within:text-violet-700" />
              </Popover.Button>
              <Popover.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="mt-2 rounded-lg bg-white p-2 shadow-xl absolute"
              >
                <AriaCalendar
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
    </div>
  )
}

function processDatePickerProps({
  minValue,
  maxValue,
  isDateUnavailable,
  placeholderValue,
  value,
  defaultValue,
  onChange,
}: IDatePickerProps): AriaDatePickerProps<DateValue> {
  return {
    minValue: minValue ? nativeDateToCalendarDate(minValue) : undefined,
    maxValue: maxValue ? nativeDateToCalendarDate(maxValue) : undefined,
    isDateUnavailable: isDateUnavailable
      ? (date) => isDateUnavailable(calendarDateToNativeDate(date as CalendarDate))
      : undefined,
    placeholderValue: placeholderValue ? nativeDateToCalendarDate(placeholderValue) : undefined,
    value: value ? nativeDateToCalendarDate(value) : undefined,
    defaultValue: defaultValue ? nativeDateToCalendarDate(defaultValue) : undefined,
    onChange: onChange ? (date) => onChange(calendarDateToNativeDate(date as CalendarDate)) : undefined,
  }
}

interface IDatePickerProps
  extends Omit<
    AriaDatePickerProps<DateValue>,
    'minValue' | 'maxValue' | 'isDateUnavailable' | 'placeholderValue' | 'value' | 'defaultValue' | 'onChange'
  > {
  /** The minimum allowed date that a user may select. */
  minValue?: Date
  /** The maximum allowed date that a user may select. */
  maxValue?: Date
  /** The maximum allowed date that a user may select. */
  isDateUnavailable?: (date: Date) => boolean
  /** Callback that is called for each date of the calendar. If it returns true, then the date is unavailable. */
  placeholderValue?: Date
  /** The element's unique identifier. See MDN. */
  value?: Date
  /** The current value (controlled). */
  defaultValue?: Date
  /** The default value (uncontrolled). */
  onChange?: (value: Date) => void
}

export function DatePicker(props: IDatePickerProps) {
  return <AriaDatePicker {...processDatePickerProps(props)} />
}
