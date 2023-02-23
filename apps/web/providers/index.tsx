import { ModalProvider } from 'ui'
import { ReactNode } from 'react'
import { ApolloProvider } from './apollo'
import { SSRProvider } from '@react-aria/ssr'

type ProvidersProps = {
  children: ReactNode
}
export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider>
      <SSRProvider>
        <ModalProvider>{children}</ModalProvider>
      </SSRProvider>
    </ApolloProvider>
  )
}
