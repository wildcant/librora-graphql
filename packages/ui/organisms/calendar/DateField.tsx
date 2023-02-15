import { createCalendar } from './utils/internationalized'
import { AriaDateFieldProps, useDateField, useDateSegment } from '@react-aria/datepicker'
import { useDateFieldState, DateSegment as DateSegmentType, DateFieldState } from '@react-stately/datepicker'
import { DateValue } from '@react-types/datepicker'
import { useRef } from 'react'
import { useDefaultLocale } from './utils/useDefaultLocale'

export function DateField(props: AriaDateFieldProps<DateValue>) {
  const { locale } = useDefaultLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const { fieldProps } = useDateField(props, state, ref)

  return (
    <div {...fieldProps} ref={ref} className="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  )
}

function DateSegment({ segment, state }: { segment: DateSegmentType; state: DateFieldState }) {
  const ref = useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth: segment.maxValue != null ? String(segment.maxValue).length + 'ch' : '',
      }}
      className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group ${
        !segment.isEditable ? 'text-gray-500' : 'text-gray-800'
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? 'visible' : 'hidden',
          height: segment.isPlaceholder ? '' : 0,
          pointerEvents: 'none',
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? '' : segment.text}
    </div>
  )
}
