import { fetchSearchBooks } from '@librora/api/operations/server'
import { Book } from '@librora/api/schema'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { BookCard, Header, Pagination, SearchBar } from 'ui'
import { MainLayout } from '../../components/layouts/MainLayout'

const BOOK_LIST_PAGE_SIZE = 8

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query as { text?: string | string[]; page?: string }

  const searchText = query.text instanceof Array ? query.text[0].split('-').join(' ') : ''
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
      searchText,
      pageIndex,
    },
  }
}

const parseSearch = (text: string) => text.split(' ').join('-')

export default function Search({
  booksList,
  searchText,
  pageIndex,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { control, handleSubmit } = useForm<{ search?: string }>({
    defaultValues: { search: searchText ?? undefined },
  })

  const newSearch = (data: { search?: string }) => router.push(`/search/${parseSearch(data?.search ?? '')}`)

  const { nodes: books, totalCount = 0, pageInfo } = booksList ?? {}
  const page = pageIndex + 1

  return (
    <MainLayout>
      <Header />

      <form onSubmit={handleSubmit(newSearch)} className="my-4">
        <SearchBar control={control} name="search" placeholder="Search" />
      </form>

      <p className="font-merienda my-2 text-sm">
        {totalCount < 1 ? 'No Products found.' : `Explore ${totalCount} books.`}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-20">
        {books?.map((book) => (
          <BookCard {...(book as Book)} />
        ))}
      </div>

      <Pagination
        hasNextPage={pageInfo?.hasNextPage}
        hasPreviousPage={pageInfo?.hasPreviousPage}
        nextPageUrl={`/search/${parseSearch(searchText)}?page=${page + 1}`}
        pageIndex={pageIndex}
        pageSize={BOOK_LIST_PAGE_SIZE}
        previousPageUrl={`/search/${parseSearch(searchText)}?page=${page - 1}`}
        totalCount={totalCount}
      />
    </MainLayout>
  )
}
