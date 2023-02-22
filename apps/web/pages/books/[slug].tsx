import { fetchBookBySlug } from '@librora/api/operations/server'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'ui'
import { BookingDetails } from '~components/pages/BookingDetails/BookDetails'
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

export default function BookDetailsPage({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book?.id) {
    return <Custom404 />
  }

  return (
    <MainLayout>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Discover</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>{book.title}</BreadcrumbItem>
      </Breadcrumb>

      <BookingDetails {...book} />
    </MainLayout>
  )
}
