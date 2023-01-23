/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Author = {
  __typename?: 'Author'
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
}

export type Book = {
  __typename?: 'Book'
  author?: Maybe<Author>
  description?: Maybe<Scalars['String']>
  editorial?: Maybe<Editorial>
  id: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export type Editorial = {
  __typename?: 'Editorial'
  name?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  author?: Maybe<Author>
  book?: Maybe<Book>
  books?: Maybe<Array<Maybe<Book>>>
  user?: Maybe<User>
}

export type QueryAuthorArgs = {
  id: Scalars['String']
}

export type QueryBookArgs = {
  id: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type User = {
  __typename?: 'User'
  firstName?: Maybe<Scalars['String']>
  id: Scalars['String']
  initial?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
}

export type BookQueryVariables = Exact<{
  id: Scalars['String']
}>

export type BookQuery = {
  __typename?: 'Query'
  book?: {
    __typename?: 'Book'
    id: string
    title?: string | null
    subtitle?: string | null
    description?: string | null
    author?: { __typename?: 'Author'; id: string; name?: string | null } | null
    user?: { __typename?: 'User'; id: string; firstName?: string | null; lastName?: string | null } | null
  } | null
}

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
export function useBookQuery(baseOptions: Apollo.QueryHookOptions<BookQuery, BookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<BookQuery, BookQueryVariables>(BookDocument, options)
}
export function useBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookQuery, BookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<BookQuery, BookQueryVariables>(BookDocument, options)
}
export type BookQueryHookResult = ReturnType<typeof useBookQuery>
export type BookLazyQueryHookResult = ReturnType<typeof useBookLazyQuery>
export type BookQueryResult = Apollo.QueryResult<BookQuery, BookQueryVariables>
