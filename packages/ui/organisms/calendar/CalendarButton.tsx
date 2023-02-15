import { AriaButtonProps, useButton } from '@react-aria/button'
import { useRef } from 'react'

export function CalendarButton(props: AriaButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const { buttonProps } = useButton(props, ref)

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? 'opacity-30' : ''} ${
        !props.isDisabled ? 'hover:bg-primary-50 active:bg-primary-200' : ''
      } focus-visible:ring-primary-700  outline-none ring-offset-2 focus-visible:ring-2`}
    >
      {props.children}
    </button>
  )
}
