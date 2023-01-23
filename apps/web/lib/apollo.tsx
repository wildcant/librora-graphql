/* eslint-disable turbo/no-undeclared-env-vars */
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

export type ApolloClientContext = {
  clientName?: string
}

const API_URL = process.env.NEXT_CMS_API_URL ?? 'http://localhost:4000'
const AuthToken =
  process.env.CMS_API_TOKEN ??
  '5676c265524b1374e7da643965f2b79a16f0126781e8617f7ed62e7181115cb4a57387ece498d11d93c451a69a0a048f3c92185f40a46ff70f833a28953ca1847a1d742fe72dd86960dc1911bc1e03f02e5e7277a66022b886ebb1f010c2b65278a529fadce6bf59615572f303c91df3cfb4cc3788a310889af81e8d0c18520f'

const createApolloClient = () => {
  return new ApolloClient({
    link: createHttpLink({
      uri: `${API_URL}/graphql`,
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      },
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
export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo({ initialState: state }), [state])
  return store
}
