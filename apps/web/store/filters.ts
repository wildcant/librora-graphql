import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'
import { ELanguage } from '@librora/api/schema'
import { useRouter } from 'next/router'
import { RangeValue } from 'ui'

export type FiltersState = {
  dateRange?: RangeValue<Date>
  search?: string
  topics: string[]
  language?: ELanguage
}

const filtersInitialValues: FiltersState = {
  topics: [],
}

const isFilterPopoverOpenVar = makeVar<boolean>(false)
type UseIsFilterPopoverOpenStateReturn = {
  isFilterPopoverOpen: boolean
  setIsFilterPopoverOpen: ReactiveVar<boolean>
}
export const useIsFilterPopoverOpenState = (): UseIsFilterPopoverOpenStateReturn => ({
  isFilterPopoverOpen: useReactiveVar(isFilterPopoverOpenVar),
  setIsFilterPopoverOpen: isFilterPopoverOpenVar,
})

/**Search range filter */
const searchVar = makeVar<FiltersState['search']>(filtersInitialValues.search)
type UseSearchFilterStateReturn = {
  searchFilter: FiltersState['search']
  setSearchFilter: ReactiveVar<FiltersState['search']>
}
export const useSearchFilterState = (): UseSearchFilterStateReturn => ({
  searchFilter: useReactiveVar(searchVar),
  setSearchFilter: searchVar,
})

/**Date range filter */
const dateRangeVar = makeVar<FiltersState['dateRange']>(filtersInitialValues.dateRange)
type UseDateRangeFilterStateReturn = {
  dateRangeFilter: FiltersState['dateRange']
  setDateRangeFilter: ReactiveVar<FiltersState['dateRange']>
}
export const useDateRangeFilterState = (): UseDateRangeFilterStateReturn => ({
  dateRangeFilter: useReactiveVar(dateRangeVar),
  setDateRangeFilter: dateRangeVar,
})

/** Topics filter */
const topicsVar = makeVar<FiltersState['topics']>(filtersInitialValues.topics)
type UseTopicsFilterStateReturn = {
  topicsFilter: FiltersState['topics']
  setTopicsFilter: ReactiveVar<FiltersState['topics']>
}
export const useTopicsFilterState = (): UseTopicsFilterStateReturn => ({
  topicsFilter: useReactiveVar(topicsVar),
  setTopicsFilter: topicsVar,
})

/** Language filter */
const languageVar = makeVar<FiltersState['language']>(filtersInitialValues.language)
type UseLanguageFilterStateReturn = {
  languageFilter: FiltersState['language']
  setLanguageFilter: ReactiveVar<FiltersState['language']>
}
export const useLanguageFilterState = (): UseLanguageFilterStateReturn => ({
  languageFilter: useReactiveVar(languageVar),
  setLanguageFilter: languageVar,
})

/**All filters */
export const setFilters = (newValues: FiltersState) => {
  searchVar(newValues.search)
  dateRangeVar(newValues.dateRange)
  topicsVar(newValues.topics)
  languageVar(newValues.language)
}
export const getFiltersValues = (): FiltersState => {
  return {
    search: searchVar(),
    dateRange: dateRangeVar(),
    topics: topicsVar(),
    language: languageVar(),
  }
}
export const useFiltersState = (): {
  filters: FiltersState
  setFilters: (newValues: FiltersState) => void
} => {
  const search = useReactiveVar(searchVar)
  const dateRange = useReactiveVar(dateRangeVar)
  const topics = useReactiveVar(topicsVar)
  const language = useReactiveVar(languageVar)

  return { filters: { search, dateRange, topics, language }, setFilters }
}

/**
 * Utility functions to mutate state.
 */

export type SearchQueryParams = {
  search?: string
  page?: string
  startDate?: string
  endDate?: string
  topics?: string | string[]
  language?: ELanguage
}

/** Set filters based on query params. */
export function useReestablishFiltersFromQueryParams() {
  const router = useRouter()

  return {
    reestablishFiltersToQueryParams(queryOverwrite?: SearchQueryParams) {
      const query = queryOverwrite ?? (router.query as SearchQueryParams)

      let topics: string[] = []
      if (query.topics) {
        if (Array.isArray(query.topics)) {
          topics = query.topics
        } else if (typeof query.topics === 'string') {
          topics = [query.topics]
        }
      }

      setFilters({
        dateRange:
          query.startDate && query.endDate
            ? { start: new Date(`${query.startDate}T00:00`), end: new Date(`${query.endDate}T00:00`) }
            : undefined,
        search: query.search,
        topics,
        language: query.language,
      })
    },
  }
}

export function clearAllFilters() {
  setFilters(filtersInitialValues)
}
