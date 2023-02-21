import { ELanguage } from '@librora/api/schema'
import format from 'date-fns/format'
import { RangeValue } from 'ui'

export function formatDateRage(dateRange?: RangeValue<Date>): string | undefined {
  if (!dateRange) return
  return `${format(dateRange.start, 'MMM dd')} - ${format(dateRange.end, 'MMM dd')}`
}

export function formatTopics(topics: string[]) {
  return topics.length > 0 ? `${topics[0]}${topics.length > 1 ? ' & more..' : ''}` : undefined
}

// TODO: Abstract to generic utility for all enums.
const ELanguageAsKey: { [key in ELanguage]: keyof typeof ELanguage } = {
  ENGLISH: 'English',
}

export function formatLanguage(language?: ELanguage) {
  return language ? ELanguageAsKey[language] : undefined
}
