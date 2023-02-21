import { fetchSearchBooks } from '@librora/api/operations/server'
import { Book, PageInfo } from '@librora/api/schema'
import { useDeepCompareEffect } from '@librora/utils/hooks'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { BookCard, Link, Pagination } from 'ui'
import { SearchQueryParams, useFiltersState, useReestablishFiltersFromQueryParams } from '~store/filters'
import { Filters } from '../components/header/components/filters/desktop/Filters'
import { MainLayout } from '../components/layouts/MainLayout'
import { buildSearchQuery, decodeSearch } from '../utils/search'

const BOOK_LIST_PAGE_SIZE = 4

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query as SearchQueryParams

  const searchText = decodeSearch(query.search) ?? ''
  const pageIndex = query.page ? parseInt(query.page, 10) - 1 : 0

  let response
  try {
    response = await fetchSearchBooks({
      variables: {
        input: {
          filters: { freeText: searchText },
          pagination: { limit: BOOK_LIST_PAGE_SIZE, offset: pageIndex * BOOK_LIST_PAGE_SIZE },
        },
      },
    })
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      booksList: response ? response.data.searchBooks : null,
      query,
      pageIndex,
    },
  }
}

interface IBooksListPaginationProps {
  query: SearchQueryParams
  pageInfo?: PageInfo
  pageIndex: number
  totalCount: number
}
// Create pagination component to avoid rerendering home page component when filters state changes.
function BooksListPagination({ pageInfo, pageIndex, totalCount }: IBooksListPaginationProps) {
  const page = pageIndex + 1
  const { filters } = useFiltersState()

  return (
    <Pagination
      hasNextPage={pageInfo?.hasNextPage}
      hasPreviousPage={pageInfo?.hasPreviousPage}
      nextPageUrl={`${buildSearchQuery(filters)}&page=${page + 1}`}
      pageIndex={pageIndex}
      pageSize={BOOK_LIST_PAGE_SIZE}
      previousPageUrl={`${buildSearchQuery(filters)}&page=${page - 1}`}
      totalCount={totalCount}
    />
  )
}

export default function Home({
  booksList,
  query,
  pageIndex,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { nodes: books, totalCount = 0, pageInfo } = booksList ?? {}
  const { reestablishFiltersToQueryParams } = useReestablishFiltersFromQueryParams()
  // const { isFilterPopoverOpen } = useIsFilterPopoverOpenState()
  useDeepCompareEffect(() => {
    reestablishFiltersToQueryParams(query)
  }, [query])

  return (
    <MainLayout>
      <Filters className="hidden md:flex" />
      {/* <div className={classNames({ 'blur-sm': isFilterPopoverOpen })}> */}
      <p className="font-merienda my-2 text-sm">
        {totalCount < 1 ? 'No results found.' : `Explore ${totalCount} books.`}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-20">
        {books?.map((book) => (
          <Link href={`/books/${book.slug}`} variant={'unstyled'}>
            <BookCard {...(book as Book)} />
          </Link>
        ))}
      </div>

      <BooksListPagination totalCount={totalCount} pageInfo={pageInfo} query={query} pageIndex={pageIndex} />
      {/* </div> */}
    </MainLayout>
  )
}
