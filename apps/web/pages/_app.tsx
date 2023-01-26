import type { AppProps } from 'next/app'
import { Providers } from '../providers'
import { Merienda, Roboto } from '@next/font/google'
import '../styles/globals.css'

const merienda = Merienda({ subsets: ['latin'], variable: '--font-merienda' })
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  style: ['normal', 'italic'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <main className={`${merienda.variable} ${roboto.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </Providers>
  )
}
