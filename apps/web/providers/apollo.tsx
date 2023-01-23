import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { getApolloClient } from '../lib/apollo'

interface IApolloProviderProps {
  children: React.ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  return <ApolloClientProvider client={getApolloClient()}>{children}</ApolloClientProvider>
}
