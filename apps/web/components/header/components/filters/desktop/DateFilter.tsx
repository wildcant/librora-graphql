import { RangeCalendar } from '@organisms'
import { useRouter } from 'next/router'
import { getFiltersValues } from '~store/filters'
import { buildSearchQuery } from '~utils/search'

export function DateFilter() {
  const currentFilters = getFiltersValues()
  const router = useRouter()

  return (
    <RangeCalendar
      onChange={(newDateRange) =>
        router.push(buildSearchQuery({ ...currentFilters, dateRange: newDateRange }))
      }
      defaultValue={currentFilters.dateRange}
    />
  )
}
