import { fetchBookBySlug } from '@librora/api/operations/server'
import format from 'date-fns/format'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, DateRangePicker, Icon } from 'ui'
import { MainLayout } from '../../components/layouts/MainLayout'
import Custom404 from '../404'

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ channel: string; locale: string; slug: string }>
) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    }
  }

  const bookSlug = context.params.slug.toString()
  const response = await fetchBookBySlug({ variables: { slug: bookSlug } })

  const book = response.data.book

  return {
    props: {
      book,
    },
    revalidate: 60, // value in seconds, how often ISR will trigger on the server
  }
}

const defaultBookImage = ''

export default function BookDetails({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book?.id) {
    return <Custom404 />
  }

  return (
    <MainLayout>
      <Breadcrumb className="mt-2">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Discover</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">History</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>{book.title}</BreadcrumbItem>
      </Breadcrumb>

      <section className="grid">
        <h1 className="mt-2 text-xl font-bold">{book.title}</h1>
        {book.author && <p className="text-sm font-light">{book.author.name}</p>}
        <div className="flex justify-center">
          <div className="relative h-64 w-[80%]">
            <Image src={book.cover ?? defaultBookImage} alt="book image" fill className="object-cover" />
          </div>
        </div>

        <div className="relative mt-6 flex flex-col items-center">
          <p>Reserve</p>
          <DateRangePicker />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Quick Facts</h3>
          <div className="mt-2 flex">
            <Icon name="pages" />
            <p className="text-sm">{book.numPages} pages</p>
          </div>
          <div className="mt-2 flex">
            <Icon name="earth" />
            <p className="text-sm">{book.language}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">About this book</h3>
          <p className="text-sm font-light">{book.description}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">More Information</h3>
          <div className="mt-2 flex items-center gap-2">
            <h5 className="text-md font-semibold">Year</h5>
            <p className="text-sm">{format(new Date(book.date), 'yyyy')}</p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
