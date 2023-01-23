import { useBookQuery } from 'api/operations/client'

export default function Home() {
  const { loading, data } = useBookQuery({ variables: { id: '3ce10880-c6a0-44a9-a143-eb1ba64def05' } })

  if (loading) {
    return <h1>Loading...</h1>
  }

  const { book } = data ?? {}
  if (!book) {
    return <h1>Book not found.</h1>
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <h5>{book.subtitle}</h5>
      <p>{book.description}</p>
    </div>
  )
}
