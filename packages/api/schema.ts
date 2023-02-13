/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import { EAdminRole } from '@librora/schemas'
import { ECountryCode } from '@librora/schemas'
import { EFormat } from '@librora/schemas'
import { ELanguage } from '@librora/schemas'
import { EUserRole } from '@librora/schemas'
import { EUserType } from '@librora/schemas'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
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
  name: Scalars['String']
}

export type Book = {
  __typename?: 'Book'
  author?: Maybe<Author>
  cover?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  editorial?: Maybe<Editorial>
  format?: Maybe<EFormat>
  id: Scalars['String']
  language?: Maybe<ELanguage>
  subtitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  user?: Maybe<User>
}

export type CreateUserInput = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  user?: Maybe<User>
}

export { EAdminRole }

export { ECountryCode }

export { EFormat }

export { ELanguage }

export { EUserRole }

export { EUserType }

export type Editorial = {
  __typename?: 'Editorial'
  name?: Maybe<Scalars['String']>
}

export type ForgotPasswordInput = {
  email: Scalars['String']
}

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<CreateUserPayload>
  forgotPassword?: Maybe<ForgotPasswordPayload>
  resendVerificationEmail?: Maybe<ResendVerificationEmail>
  resetPassword?: Maybe<ResetPasswordPayload>
  signIn?: Maybe<SignInPayload>
  validateAction?: Maybe<ValidateActionPayload>
  verifyEmail?: Maybe<VerifyEmailPayload>
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput
}

export type MutationResendVerificationEmailArgs = {
  token: Scalars['String']
}

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationValidateActionArgs = {
  id: Scalars['String']
}

export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput
}

export type Query = {
  __typename?: 'Query'
  author?: Maybe<Author>
  book?: Maybe<Book>
  books?: Maybe<Array<Maybe<Book>>>
  searchBooks?: Maybe<Array<Maybe<Book>>>
  user?: Maybe<User>
}

export type QueryAuthorArgs = {
  id: Scalars['String']
}

export type QueryBookArgs = {
  id: Scalars['String']
}

export type QuerySearchBooksArgs = {
  text: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type ResendVerificationEmail = {
  __typename?: 'ResendVerificationEmail'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
}

export type ResetPasswordInput = {
  newPassword: Scalars['String']
  token: Scalars['String']
}

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  user?: Maybe<User>
}

export type SignInInput = {
  account: Scalars['String']
  password: Scalars['String']
}

export type SignInPayload = {
  __typename?: 'SignInPayload'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  user?: Maybe<User>
}

export type User = {
  __typename?: 'User'
  books?: Maybe<Array<Maybe<Book>>>
  countryCode?: Maybe<ECountryCode>
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['String']
  initial: Scalars['String']
  isEmailValidated: Scalars['Boolean']
  lastName: Scalars['String']
  name?: Maybe<Scalars['String']>
  role: EUserRole
  type: EUserType
  username: Scalars['String']
}

export type ValidateActionPayload = {
  __typename?: 'ValidateActionPayload'
  message?: Maybe<Scalars['String']>
  valid: Scalars['Boolean']
}

export type VerifyEmailInput = {
  token: Scalars['String']
}

export type VerifyEmailPayload = {
  __typename?: 'VerifyEmailPayload'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
}

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = {
  __typename?: 'Mutation'
  createUser?: {
    __typename?: 'CreateUserPayload'
    success?: boolean | null
    message?: string | null
    user?: { __typename?: 'User'; id: string; firstName: string; lastName: string; username: string } | null
  } | null
}

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput
}>

export type ForgotPasswordMutation = {
  __typename?: 'Mutation'
  forgotPassword?: {
    __typename?: 'ForgotPasswordPayload'
    success?: boolean | null
    message?: string | null
  } | null
}

export type ResendVerificationEmailMutationVariables = Exact<{
  token: Scalars['String']
}>

export type ResendVerificationEmailMutation = {
  __typename?: 'Mutation'
  resendVerificationEmail?: {
    __typename?: 'ResendVerificationEmail'
    message?: string | null
    success?: boolean | null
  } | null
}

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput
}>

export type ResetPasswordMutation = {
  __typename?: 'Mutation'
  resetPassword?: {
    __typename?: 'ResetPasswordPayload'
    success?: boolean | null
    message?: string | null
  } | null
}

export type SignInMutationVariables = Exact<{
  input: SignInInput
}>

export type SignInMutation = {
  __typename?: 'Mutation'
  signIn?: {
    __typename?: 'SignInPayload'
    success?: boolean | null
    message?: string | null
    user?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
  } | null
}

export type ValidateActionMutationVariables = Exact<{
  id: Scalars['String']
}>

export type ValidateActionMutation = {
  __typename?: 'Mutation'
  validateAction?: { __typename?: 'ValidateActionPayload'; message?: string | null; valid: boolean } | null
}

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput
}>

export type VerifyEmailMutation = {
  __typename?: 'Mutation'
  verifyEmail?: {
    __typename?: 'VerifyEmailPayload'
    success?: boolean | null
    message?: string | null
  } | null
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
    author?: { __typename?: 'Author'; id: string; name: string } | null
    user?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
  } | null
}

export type SearchBooksQueryVariables = Exact<{
  text: Scalars['String']
}>

export type SearchBooksQuery = {
  __typename?: 'Query'
  searchBooks?: Array<{
    __typename?: 'Book'
    id: string
    title?: string | null
    subtitle?: string | null
    description?: string | null
    cover?: string | null
    author?: { __typename?: 'Author'; name: string } | null
  } | null> | null
}
