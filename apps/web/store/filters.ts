import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'
import { RangeValue } from '@organisms'

const filtersInitialValues: IFiltersState = {}

export interface IFiltersState {
  dateRange?: RangeValue<Date>
  search?: string
}

const searchVar = makeVar<IFiltersState['search']>(filtersInitialValues.search)
type UseSearchFilterStateReturn = {
  searchFilter: IFiltersState['search']
  setSearchFilter: ReactiveVar<IFiltersState['search']>
}
export const useSearchFilterState = (): UseSearchFilterStateReturn => ({
  searchFilter: useReactiveVar(searchVar),
  setSearchFilter: searchVar,
})

const dateRangeVar = makeVar<IFiltersState['dateRange']>(filtersInitialValues.dateRange)
type UseDateRangeFilterStateReturn = {
  dateRangeFilter: IFiltersState['dateRange']
  setDateRangeFilter: ReactiveVar<IFiltersState['dateRange']>
}
export const useDateRangeFilterState = (): UseDateRangeFilterStateReturn => ({
  dateRangeFilter: useReactiveVar(dateRangeVar),
  setDateRangeFilter: dateRangeVar,
})

export const setFilters = (mewValues: IFiltersState) => {
  searchVar(mewValues.search)
  dateRangeVar(mewValues.dateRange)
}

export const useFiltersState = (): {
  filters: IFiltersState
  setFilters: (newValues: IFiltersState) => void
} => {
  const search = useReactiveVar(searchVar)
  const dateRange = useReactiveVar(dateRangeVar)

  return { filters: { search, dateRange }, setFilters }
}
