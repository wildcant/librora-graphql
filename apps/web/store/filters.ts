import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'
import { ELanguage } from '@librora/api/schema'
import { useRouter } from 'next/router'
import { RangeValue } from 'ui'

export interface IFiltersState {
  dateRange?: RangeValue<Date>
  search?: string
  topics: string[]
  language?: ELanguage
}

const filtersInitialValues: IFiltersState = {
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
const searchVar = makeVar<IFiltersState['search']>(filtersInitialValues.search)
type UseSearchFilterStateReturn = {
  searchFilter: IFiltersState['search']
  setSearchFilter: ReactiveVar<IFiltersState['search']>
}
export const useSearchFilterState = (): UseSearchFilterStateReturn => ({
  searchFilter: useReactiveVar(searchVar),
  setSearchFilter: searchVar,
})

/**Date range filter */
const dateRangeVar = makeVar<IFiltersState['dateRange']>(filtersInitialValues.dateRange)
type UseDateRangeFilterStateReturn = {
  dateRangeFilter: IFiltersState['dateRange']
  setDateRangeFilter: ReactiveVar<IFiltersState['dateRange']>
}
export const useDateRangeFilterState = (): UseDateRangeFilterStateReturn => ({
  dateRangeFilter: useReactiveVar(dateRangeVar),
  setDateRangeFilter: dateRangeVar,
})

/** Topics filter */
const topicsVar = makeVar<IFiltersState['topics']>(filtersInitialValues.topics)
type UseTopicsFilterStateReturn = {
  topicsFilter: IFiltersState['topics']
  setTopicsFilter: ReactiveVar<IFiltersState['topics']>
}
export const useTopicsFilterState = (): UseTopicsFilterStateReturn => ({
  topicsFilter: useReactiveVar(topicsVar),
  setTopicsFilter: topicsVar,
})

/** Language filter */
const languageVar = makeVar<IFiltersState['language']>(filtersInitialValues.language)
type UseLanguageFilterStateReturn = {
  languageFilter: IFiltersState['language']
  setLanguageFilter: ReactiveVar<IFiltersState['language']>
}
export const useLanguageFilterState = (): UseLanguageFilterStateReturn => ({
  languageFilter: useReactiveVar(languageVar),
  setLanguageFilter: languageVar,
})

/**All filters */
export const setFilters = (newValues: IFiltersState) => {
  searchVar(newValues.search)
  dateRangeVar(newValues.dateRange)
  topicsVar(newValues.topics)
  languageVar(newValues.language)
}
export const getFiltersValues = (): IFiltersState => {
  return {
    search: searchVar(),
    dateRange: dateRangeVar(),
    topics: topicsVar(),
    language: languageVar(),
  }
}
export const useFiltersState = (): {
  filters: IFiltersState
  setFilters: (newValues: IFiltersState) => void
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
