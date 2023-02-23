import cn from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

type LoaderProps = ComponentPropsWithoutRef<'svg'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: 'primary' | 'secondary'
}

const dimension = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 64,
}

export function Loader({ size = 'lg', color = 'primary', className, ...props }: LoaderProps) {
  const d = dimension[size]

  const loaderClassName = cn(
    {
      'text-primary-600': color === 'primary',
      'text-secondary-600': color === 'secondary',
    },
    className
  )

  return (
    <svg
      width={d}
      height={d}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      className={loaderClassName}
      stroke="currentColor"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".1" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}
