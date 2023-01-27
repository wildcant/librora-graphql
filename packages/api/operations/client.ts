/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from './schema'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const

export const BookDocument = gql`
  query Book($id: String!) {
    book(id: $id) {
      id
      title
      subtitle
      description
      author {
        id
        name
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`

/**
 * __useBookQuery__
 *
 * To run a query within a React component, call `useBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookQuery(
  baseOptions: Apollo.QueryHookOptions<Types.BookQuery, Types.BookQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.BookQuery, Types.BookQueryVariables>(BookDocument, options)
}
export function useBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.BookQuery, Types.BookQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.BookQuery, Types.BookQueryVariables>(BookDocument, options)
}
export type BookQueryHookResult = ReturnType<typeof useBookQuery>
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>
export type BookQueryResult = Apollo.QueryResult<Types.BookQuery, Types.BookQueryVariables>
