import cn from 'classnames'
import { useRef } from 'react'
import { AriaDateFieldProps, useDateField, useDateSegment } from 'react-aria'
import { DateFieldState, DateSegment as DateSegmentType, useDateFieldState } from 'react-stately'
import { DateValue, createCalendar } from './utils/internationalized'
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
    <div {...fieldProps} ref={ref} className="flex justify-center">
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
      className={cn(
        'box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group md:px-0.5',
        {
          ['text-gray-800']: segment.isEditable,
          ['text-gray-500']: !segment.isEditable,
        }
      )}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="flex w-full text-center italic text-gray-500 group-focus:text-white text-xs items-center h-full justify-center"
        style={{
          visibility: segment.isPlaceholder ? 'visible' : 'hidden',
          height: segment.isPlaceholder ? '' : 0,
          pointerEvents: 'none',
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? (
        ''
      ) : (
        <span className="flex items-center h-full justify-center text-xs md:text-md">{segment.text}</span>
      )}
    </div>
  )
}
