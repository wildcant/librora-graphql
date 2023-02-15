import { fetchSearchBooks } from '@librora/api/operations/server'
import { Book } from '@librora/api/schema'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { BookCard, Header, SearchBar } from 'ui'
import { MainLayout } from '../../components/layouts/MainLayout'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const textQuery = context.query.text instanceof Array ? context.query.text[0].split('-').join(' ') : null

  let response
  try {
    response = await fetchSearchBooks({ variables: { text: textQuery ?? '' } })
  } catch (error) {
    // TODO: Handle error.
    console.error(JSON.stringify(error))
  }

  return {
    props: {
      books: response?.data.searchBooks ?? [],
      query: textQuery,
    },
  }
}

export default function Search({ books, query }: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { control, handleSubmit } = useForm<{ search?: string }>({
    defaultValues: { search: query ?? undefined },
  })
  const { replace } = useRouter()

  return (
    <MainLayout>
      <Header />

      <form
        onSubmit={handleSubmit((data) => replace(`/search/${data.search?.trim().split(' ').join('-')}`))}
        className="my-4"
      >
        <SearchBar control={control} name="search" placeholder="Search" />
      </form>

      <p className="font-merienda my-2 text-sm">Explore {books.length} books.</p>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-20">
        {books.map((book) => (
          <BookCard {...(book as Book)} />
        ))}
      </div>
    </MainLayout>
  )
}
