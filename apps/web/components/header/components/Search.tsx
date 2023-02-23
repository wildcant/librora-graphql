import { useRouter } from 'next/router'
import { decodeSearch, encodeSearch } from '../../../utils/search'
import { SearchBar } from './search-bar/SearchBar'

type SearchProps = {
  containerClassName?: string
  className?: string
}

export function Search({ className, containerClassName }: SearchProps) {
  const router = useRouter()
  const search = router.query.search as string | undefined

  const newSearch = (data: { search?: string }) => router.push(`?search=${encodeSearch(data?.search ?? '')}`)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newSearch({ search: (e.target as any).search.value as string })
      }}
      className={containerClassName}
    >
      <SearchBar
        name="search"
        placeholder="Search"
        defaultValue={decodeSearch(search)}
        className={className}
      />
    </form>
  )
}
