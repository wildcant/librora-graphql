import { Merienda, Roboto } from '@next/font/google'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { PropsWithChildren } from 'react'
import { Providers } from '../providers'
import '../styles/globals.css'

const merienda = Merienda({ subsets: ['latin'], variable: '--font-merienda' })
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  style: ['normal', 'italic'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

type NextPageWithLayout = NextPage & {
  Layout?: any
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? (({ children }: PropsWithChildren<{}>) => <>{children}</>)

  return (
    <Providers>
      <main className={`${merienda.variable} ${roboto.variable} font-sans`}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Providers>
  )
}
