import { Merienda, Roboto_Slab, Cormorant_Garamond, Plus_Jakarta_Sans } from '@next/font/google'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { PropsWithChildren, useEffect } from 'react'
import { Providers } from '../providers'
import '../styles/globals.css'

const merienda = Merienda({ subsets: ['latin'], variable: '--font-merienda' })

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  style: ['normal'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
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

  useEffect(() => {
    // TODO: Double check.
    function setViewHeight() {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    setViewHeight()
    window.addEventListener('resize', () => {
      setViewHeight()
    })
  }, [])

  return (
    <Providers>
      <main className={`${merienda.variable} ${robotoSlab.variable} ${plusJakartaSans.variable}`}>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Providers>
  )
}
