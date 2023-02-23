import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { getApolloClient } from '../lib/apollo'

type ApolloProviderProps = {
  children: React.ReactNode
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return <ApolloClientProvider client={getApolloClient()}>{children}</ApolloClientProvider>
}
