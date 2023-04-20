import { Popover, Transition } from '@headlessui/react'
import { Placement } from '@popperjs/core'
import cn from 'classnames'
import { ComponentPropsWithoutRef, Fragment, useState } from 'react'
import { usePopper } from 'react-popper'
import { Divider } from 'ui'
import { useFiltersState } from '~store/filters'
import { formatDateRage, formatTopics } from '../utils'
import { DateFilter } from './DateFilter'
import { TopicsFilter } from './TopicsFilter'

/*
function SearchAction() {
  const { filters } = useFiltersState()

  return (
    <Link
      href={buildSearchQuery(filters)}
      variant="unstyled"
      className="bg-primary-600 mr-2 flex h-12 w-12 flex-row items-center justify-center self-center rounded-full text-white"
    >
      <Icon name="search" />
    </Link>
  )
}
*/

function FilterField({
  fieldName,
  fieldPlaceholder,
  fieldValue,
  className,
  children,
  buttonClassName,
  placement,
  panelClassName,
  ...props
}: ComponentPropsWithoutRef<'button'> & {
  fieldName: string
  fieldPlaceholder: string
  hideButton?: boolean
  fieldValue?: string
  buttonClassName?: string
  panelClassName?: string
  placement?: Placement
}) {
  // const { setIsFilterPopoverOpen } = useIsFilterPopoverOpenState()
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement ?? 'bottom',
    modifiers: [{ name: 'offset', options: { offset: [0, 12] } }],
  })

  return (
    <Popover className={cn('relative flex flex-1', className)}>
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className={cn(
              'm-0 flex flex-1 flex-col items-center rounded-full py-3 hover:bg-neutral-100',
              { 'bg-neutral-100 shadow-2xl': open },
              buttonClassName
            )}
            // onClick={() => setIsFilterPopoverOpen(open ? false : true)}
            {...props}
          >
            <span className="text-sm font-light text-neutral-500">{fieldName}</span>
            <span className="text-sm font-light text-neutral-700">{fieldValue ?? fieldPlaceholder}</span>
          </Popover.Button>
          {/* <Portal> */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className={cn('z-10 rounded-[32px] bg-white p-8 shadow-2xl', panelClassName)}
            >
              {children}
            </Popover.Panel>
          </Transition>
          {/* </Portal> */}
        </>
      )}
    </Popover>
  )
}

export function Filters({ className }: { className: string }) {
  const { filters } = useFiltersState()

  return (
    <div className={cn('mx-auto mb-8 flex w-full max-w-4xl flex-row rounded-full border', className)}>
      <FilterField
        fieldName="When"
        placement="bottom-start"
        fieldPlaceholder="Add dates"
        fieldValue={formatDateRage(filters.dateRange)}
      >
        <DateFilter />
      </FilterField>
      <div className="py-3 peer-focus:hidden">
        <Divider isVertical />
      </div>

      <FilterField
        fieldName="Topic"
        fieldPlaceholder="Add subject"
        panelClassName="h-[352px] min-w-[480px]"
        fieldValue={formatTopics(filters.topics)}
        placement="bottom-end"
      >
        <TopicsFilter />
      </FilterField>
      {/*
      <div className="py-3">
        <Divider isVertical />
      </div>
      <Button variant="unstyled" className="text-primary-700 px-4 text-xs">
        More Filters
      </Button>
       <SearchAction /> 
       */}
    </div>
  )
}
