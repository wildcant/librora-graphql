import { useRouter } from 'next/router'
import { Autocomplete } from 'ui'
import { getFiltersValues } from '~store/filters'
import { buildSearchQuery } from '~utils/search'
import { useTopicsFilter } from '../useTopicsFilter'

export function TopicsFilter() {
  const router = useRouter()
  const currentFilters = getFiltersValues()
  const { loading, defaultValues, topicsOptions } = useTopicsFilter(currentFilters.topics)

  return (
    <div>
      <Autocomplete
        defaultValue={defaultValues}
        label="Search Topics"
        loading={loading}
        multiple
        onChange={(selectedTopics) =>
          // TODO: Usability could be improved a lot here by having a local state before requesting a new search.
          router.push(
            buildSearchQuery({ ...currentFilters, topics: selectedTopics.map(({ label }) => label) })
          )
        }
        options={topicsOptions}
        optionsContainerProps={{ unstyled: true }}
      />
    </div>
  )
}
