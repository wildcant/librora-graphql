import cn from 'classnames'
import { Children, cloneElement, ComponentPropsWithoutRef, isValidElement } from 'react'

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'>

function getValidChildren(children: React.ReactNode) {
  return Children.toArray(children).filter((child) => isValidElement(child)) as React.ReactElement[]
}

export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  const validChildren = getValidChildren(children)
  const count = validChildren.length

  const clones = validChildren.map((child, index) =>
    cloneElement(child, {
      isLastChild: count === index + 1,
    })
  )

  return (
    <nav className="my-1 mx-0" {...props}>
      <ol className={cn('flex list-none p-0 items-center flex-wrap', className)}>{clones}</ol>
    </nav>
  )
}
