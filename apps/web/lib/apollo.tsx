/* eslint-disable turbo/no-undeclared-env-vars */
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

export type ApolloClientContext = {
  clientName?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

const createApolloClient = () => {
  return new ApolloClient({
    link: createHttpLink({
      uri: `${API_URL}/graphql`,
      // headers: { Authorization: `Bearer ${AuthToken}` },
    }),
    cache: new InMemoryCache(),
  })
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
// ApolloClient Singleton
export function initializeApollo(initialState = {}): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function getApolloClient(ctx?: ApolloClientContext, initialState?: NormalizedCacheObject) {
  if (ctx) {
    // Noop
    // TODO: play around with request headers and cookies.
  }
  if (initialState) {
    // Noop
    // TODO: play around with apollo state and cache.
  }

  return apolloClient ?? initializeApollo(initialState)
}

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
export function useApollo(pageProps: AppProps['pageProps'] = {}) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo({ initialState: state }), [state])
  return store
}
