import { useTopicsQuery } from '@librora/api/operations/client'
import { useMemo } from 'react'
import { Option } from 'ui'

export function useTopicsFilter(topicsFilterValues: string[]) {
  const { data, loading } = useTopicsQuery()
  const topics = data?.topics

  // we must memoize the options otherwise the combobox within the autocomplete will reset.
  const topicsOptions: Option<string>[] = useMemo(
    () => topics?.map((topic) => ({ value: topic.id, label: topic.name })) ?? [],
    // TODO: Investigate: primitives are compared by value and arrays and objects are compared by reference.
    [topics]
  )
  const defaultValues = topicsFilterValues.length
    ? // Make sure the topics currently set in filters are still available.
      (topicsFilterValues
        .map((topicFilter) => topicsOptions.find((topicOption) => topicFilter === topicOption.label))
        .filter((t) => !!t) as Option[])
    : []

  return { loading, defaultValues, topicsOptions }
}
