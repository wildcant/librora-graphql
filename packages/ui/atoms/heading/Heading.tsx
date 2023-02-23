import { ComponentPropsWithoutRef } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h1'> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
export function Heading({ as: As, ...props }: HeadingProps) {
  const Element = As

  if (Element) {
    return <Element {...props} />
  }

  return <h1 {...props} />
}
