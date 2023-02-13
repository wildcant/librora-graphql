import { fetchSearchBooks } from '@librora/api/operations/server'
import { Book } from '@librora/api/schema'
import { SearchBar } from '@molecules'
import { Header } from '@organisms'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

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

function BookCard({ title, subtitle, description, cover }: Book) {
  return (
    <div className="bg-secondary-lighter mb-2 flex flex-row p-4 shadow-md md:w-1/2">
      {cover && <Image src={cover} width="100" height="100" alt="book" />}
      <div className="md:ml-2">
        <h1 className="text-lg">{title}</h1>
        <h5 className="text-md">{subtitle}</h5>
        <p className="font-sans text-xs">{description}</p>
      </div>
    </div>
  )
}

export default function Search({ books, query }: InferGetStaticPropsType<typeof getServerSideProps>) {
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
          className="my-4"
        >
          <SearchBar control={control} name="search" placeholder="Search" />
        </form>

        <p className="font-merienda my-2 text-sm">Explore {books.length} books.</p>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          {books.map((book) => (
            <BookCard {...(book as Book)} />
          ))}
        </div>
      </div>
    </div>
  )
}
