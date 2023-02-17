import format from 'date-fns/format'
import { IFiltersState } from '~store/filters'

export function encodeSearch(search: string) {
  return search.split(' ').join('-')
}

export function decodeSearch(search?: string) {
  return search?.split('-').join(' ')
}

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd')

export function buildSearchQuery(filters: IFiltersState): string {
  let query = '?'
  if (filters.search) {
    query += `search=${encodeSearch(filters.search)}`
  }

  if (filters.dateRange) {
    query += `&startDate=${formatDate(filters.dateRange.start)}&endDate=${formatDate(filters.dateRange.end)}`
  }

  return query
}
