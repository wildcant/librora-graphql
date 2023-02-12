import { SearchBar } from '@molecules'
import { Header } from '@organisms'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query.q instanceof Array ? context.query.q[0].split('-').join(' ') : null
  // TODO: Fetch books

  return {
    props: {
      booksCount: 1,
      books: [],
      query,
    },
  }
}

export default function Search({
  booksCount,
  books,
  query,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const { control, handleSubmit } = useForm<{ search?: string }>({
    defaultValues: { search: query ?? undefined },
  })
  const { replace } = useRouter()
  return (
    <div className="bg-secondary-lightest min-h-screen w-full bg-[url('../public/noise.png')]">
      <div className="wp-4 container mx-auto min-h-screen md:p-6">
        <Header />

        <form
          onSubmit={handleSubmit((data) => replace(`/search/${data.search?.trim().split(' ').join('-')}`))}
        >
          <SearchBar control={control} name="search" placeholder="Search" />
        </form>

        <p>{query}</p>

        <p>Explore {booksCount} books.</p>

        {/* TODO: Add books card list */}
        {books.map((book) => (
          <div>{book}</div>
        ))}
      </div>
    </div>
  )
}
