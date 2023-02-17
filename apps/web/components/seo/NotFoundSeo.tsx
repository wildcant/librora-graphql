import { NextSeo } from 'next-seo'

export function NotFoundSeo() {
  const title = `Page Not found - Librora`
  const description = 'Page not found.'

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [{ url: '', alt: 'hero image' }],
        site_name: 'Librora',
      }}
    />
  )
}
