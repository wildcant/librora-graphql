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
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
      message
    }
  }
`
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  Types.ForgotPasswordMutation,
  Types.ForgotPasswordMutationVariables
>

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ForgotPasswordMutation,
    Types.ForgotPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.ForgotPasswordMutation, Types.ForgotPasswordMutationVariables>(
    ForgotPasswordDocument,
    options
  )
}
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>
export type ForgotPasswordMutationResult = Apollo.MutationResult<Types.ForgotPasswordMutation>
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  Types.ForgotPasswordMutation,
  Types.ForgotPasswordMutationVariables
>
export const ResendVerificationEmailDocument = gql`
  mutation ResendVerificationEmail($token: String!) {
    resendVerificationEmail(token: $token) {
      message
      success
    }
  }
`
export type ResendVerificationEmailMutationFn = Apollo.MutationFunction<
  Types.ResendVerificationEmailMutation,
  Types.ResendVerificationEmailMutationVariables
>

/**
 * __useResendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useResendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationEmailMutation, { data, loading, error }] = useResendVerificationEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResendVerificationEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ResendVerificationEmailMutation,
    Types.ResendVerificationEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    Types.ResendVerificationEmailMutation,
    Types.ResendVerificationEmailMutationVariables
  >(ResendVerificationEmailDocument, options)
}
export type ResendVerificationEmailMutationHookResult = ReturnType<typeof useResendVerificationEmailMutation>
export type ResendVerificationEmailMutationResult =
  Apollo.MutationResult<Types.ResendVerificationEmailMutation>
export type ResendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<
  Types.ResendVerificationEmailMutation,
  Types.ResendVerificationEmailMutationVariables
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
export const ValidateActionDocument = gql`
  mutation ValidateAction($id: String!) {
    validateAction(id: $id) {
      message
      valid
    }
  }
`
export type ValidateActionMutationFn = Apollo.MutationFunction<
  Types.ValidateActionMutation,
  Types.ValidateActionMutationVariables
>

/**
 * __useValidateActionMutation__
 *
 * To run a mutation, you first call `useValidateActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateActionMutation, { data, loading, error }] = useValidateActionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useValidateActionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.ValidateActionMutation,
    Types.ValidateActionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.ValidateActionMutation, Types.ValidateActionMutationVariables>(
    ValidateActionDocument,
    options
  )
}
export type ValidateActionMutationHookResult = ReturnType<typeof useValidateActionMutation>
export type ValidateActionMutationResult = Apollo.MutationResult<Types.ValidateActionMutation>
export type ValidateActionMutationOptions = Apollo.BaseMutationOptions<
  Types.ValidateActionMutation,
  Types.ValidateActionMutationVariables
>
export const VerifyEmailDocument = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      success
      message
    }
  }
`
export type VerifyEmailMutationFn = Apollo.MutationFunction<
  Types.VerifyEmailMutation,
  Types.VerifyEmailMutationVariables
>

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<Types.VerifyEmailMutation, Types.VerifyEmailMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<Types.VerifyEmailMutation, Types.VerifyEmailMutationVariables>(
    VerifyEmailDocument,
    options
  )
}
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>
export type VerifyEmailMutationResult = Apollo.MutationResult<Types.VerifyEmailMutation>
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<
  Types.VerifyEmailMutation,
  Types.VerifyEmailMutationVariables
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
export const SearchBooksDocument = gql`
  query SearchBooks($input: SearchBooksInput!) {
    searchBooks(input: $input) {
      nodes {
        id
        title
        cover
        date
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`

/**
 * __useSearchBooksQuery__
 *
 * To run a query within a React component, call `useSearchBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchBooksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchBooksQuery(
  baseOptions: Apollo.QueryHookOptions<Types.SearchBooksQuery, Types.SearchBooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.SearchBooksQuery, Types.SearchBooksQueryVariables>(
    SearchBooksDocument,
    options
  )
}
export function useSearchBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Types.SearchBooksQuery, Types.SearchBooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.SearchBooksQuery, Types.SearchBooksQueryVariables>(
    SearchBooksDocument,
    options
  )
}
export type SearchBooksQueryHookResult = ReturnType<typeof useSearchBooksQuery>
export type SearchBooksLazyQueryHookResult = ReturnType<typeof useSearchBooksLazyQuery>
export type SearchBooksQueryResult = Apollo.QueryResult<
  Types.SearchBooksQuery,
  Types.SearchBooksQueryVariables
>
