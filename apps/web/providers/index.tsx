import { ModalProvider } from 'ui'
import { ReactNode } from 'react'
import { ApolloProvider } from './apollo'
import { SSRProvider } from '@react-aria/ssr'

interface IProvidersProps {
  children: ReactNode
}
export function Providers({ children }: IProvidersProps) {
  return (
    <ApolloProvider>
      <SSRProvider>
        <ModalProvider>{children}</ModalProvider>
      </SSRProvider>
    </ApolloProvider>
  )
}
