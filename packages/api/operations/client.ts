/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from '../schema'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const

export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        firstName
        lastName
        username
      }
      success
      message
    }
  }
`
export type CreateUserMutationFn = Apollo.MutationFunction<
  Types.CreateUserMutation,
  Types.CreateUserMutationVariables
>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.CreateUserMutation, Types.CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.CreateUserMutation, Types.CreateUserMutationVariables>(
    CreateUserDocument,
    options
  )
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<Types.CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  Types.CreateUserMutation,
  Types.CreateUserMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  Types.ResetPasswordMutation,
  Types.ResetPasswordMutationVariables
>

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.ResetPasswordMutation, Types.ResetPasswordMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.ResetPasswordMutation, Types.ResetPasswordMutationVariables>(
    ResetPasswordDocument,
    options
  )
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<Types.ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ResetPasswordMutation,
  Types.ResetPasswordMutationVariables
>
export const SignInDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      success
      message
      user {
        id
        firstName
        lastName
      }
    }
  }
`
export type SignInMutationFn = Apollo.MutationFunction<Types.SignInMutation, Types.SignInMutationVariables>

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.SignInMutation, Types.SignInMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.SignInMutation, Types.SignInMutationVariables>(SignInDocument, options)
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>
export type SignInMutationResult = Apollo.MutationResult<Types.SignInMutation>
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  Types.SignInMutation,
  Types.SignInMutationVariables
>
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
