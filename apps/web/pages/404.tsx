import { Logo } from 'ui'
import Link from 'next/link'
import { NotFoundSeo } from '../components/seo/NotFoundSeo'

function Custom404() {
  return (
    <div className="container mx-auto">
      <NotFoundSeo />
      <div className="min-h-screen">
        <div className="py-10 px-8">
          <header className="mb-4">
            <Link href="/">
              <Logo />
            </Link>
          </header>
          <main>
            <p>Ups!</p>
            <p>Page not found</p>
            <Link href="/">Go back home</Link>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Custom404
