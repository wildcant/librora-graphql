/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from './schema'

import * as Operations from './client'
import * as Apollo from '@apollo/client'
import type React from 'react'
import { getApolloClient, ApolloClientContext } from '../../../apps/web/lib/apollo'
export async function fetchBook(
  options?: Omit<Apollo.QueryOptions<Types.BookQueryVariables>, 'query'>,
  ctx?: ApolloClientContext
) {
  const apolloClient = getApolloClient(ctx)
  const allOptions = { ...options, ...{} }
  const data = await apolloClient.query<Types.BookQuery>({ ...allOptions, query: Operations.BookDocument })

  const apolloState = apolloClient.cache.extract()

  return {
    apolloState: apolloState,
    data: data?.data,
    error: data?.error ?? data?.errors ?? null,
  }
}
