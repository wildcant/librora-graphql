/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import { EAdminRole } from 'schemas/enums'
import { ECountryCode } from 'schemas/enums'
import { EUserRole } from 'schemas/enums'
import { EUserType } from 'schemas/enums'
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

export type CreateUserInput = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload'
  user?: Maybe<User>
}

export { EAdminRole }

export { ECountryCode }

export { EUserRole }

export { EUserType }

export type Editorial = {
  __typename?: 'Editorial'
  name?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<CreateUserPayload>
}

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>
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
  countryCode?: Maybe<ECountryCode>
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['String']
  initial: Scalars['String']
  isEmailValidated: Scalars['Boolean']
  lastName: Scalars['String']
  role: EUserRole
  type: EUserType
  username: Scalars['String']
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
    user?: { __typename?: 'User'; id: string; firstName: string; lastName: string } | null
  } | null
}
