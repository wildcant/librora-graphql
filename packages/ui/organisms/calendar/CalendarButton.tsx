import { AriaButtonProps, useButton } from '@react-aria/button'
import { useFocusRing } from '@react-aria/focus'
import { mergeProps } from '@react-aria/utils'
import { useRef } from 'react'

export function CalendarButton(props: AriaButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const { buttonProps } = useButton(props, ref)

  const { focusProps, isFocusVisible } = useFocusRing()

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? 'opacity-30' : ''} ${
        !props.isDisabled ? 'hover:bg-primary-50 active:bg-primary-200' : ''
      } outline-none ${isFocusVisible ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`}
    >
      {props.children}
    </button>
  )
}
