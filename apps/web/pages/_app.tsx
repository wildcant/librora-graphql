import { Merienda, Roboto_Slab, Cormorant_Garamond } from '@next/font/google'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { PropsWithChildren } from 'react'
import { Providers } from '../providers'
import '../styles/globals.css'

const merienda = Merienda({ subsets: ['latin'], variable: '--font-merienda' })

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  style: ['normal'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

const comrantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-comrant-garamond',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
})

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Layout?: any
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? (({ children }: PropsWithChildren<{}>) => <>{children}</>)

  return (
    <Providers>
      <main className={`${merienda.variable} ${robotoSlab.variable} ${comrantGaramond.variable}`}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Providers>
  )
}
