/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

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
  Date: any
  JSON: any
}

export type Author = {
  __typename?: 'Author'
  id: Scalars['String']
  name: Scalars['String']
}

export type AuthorConnection = {
  __typename?: 'AuthorConnection'
  nodes: Array<Author>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type Book = {
  __typename?: 'Book'
  author?: Maybe<Author>
  cover?: Maybe<Scalars['String']>
  coverThumbnail?: Maybe<Scalars['String']>
  date: Scalars['String']
  description?: Maybe<Scalars['String']>
  editorial?: Maybe<Editorial>
  format?: Maybe<EFormat>
  id: Scalars['String']
  language?: Maybe<ELanguage>
  numPages: Scalars['Int']
  owner: User
  slug: Scalars['String']
  subtitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type BookConnection = {
  __typename?: 'BookConnection'
  nodes: Array<Book>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type BookFilters = {
  author?: InputMaybe<Scalars['ID']>
  freeText: Scalars['String']
  language?: InputMaybe<ELanguage>
}

export type BookSort = {
  by?: InputMaybe<Scalars['String']>
  order?: InputMaybe<ESort>
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

export enum EAdminRole {
  Billing = 'BILLING',
  Super = 'SUPER',
}

export enum ECountryCode {
  Co = 'CO',
}

export enum EFormat {
  Book = 'BOOK',
  Epub = 'EPUB',
  Pdf = 'PDF',
}

export enum ELanguage {
  English = 'ENGLISH',
}

export enum EReservationChangeRequestState {
  ChangeCancelled = 'CHANGE_CANCELLED',
  ChangeConfirmed = 'CHANGE_CONFIRMED',
  ChangeDenied = 'CHANGE_DENIED',
  ChangePending = 'CHANGE_PENDING',
}

export enum EReservationState {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Denied = 'DENIED',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Returned = 'RETURNED',
  Withdrawn = 'WITHDRAWN',
}

export enum ESort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum EUserRole {
  LenderBorrower = 'LENDER_BORROWER',
  Visitor = 'VISITOR',
}

export enum EUserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export type Editorial = {
  __typename?: 'Editorial'
  name?: Maybe<Scalars['String']>
}

export type EditorialConnection = {
  __typename?: 'EditorialConnection'
  nodes: Array<Editorial>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ForgotPasswordInput = {
  email: Scalars['String']
}

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
}

export type GeoJson = {
  __typename?: 'GeoJSON'
  coordinates?: Maybe<Scalars['JSON']>
  type?: Maybe<Scalars['String']>
}

export type LatLngLiteral = {
  __typename?: 'LatLngLiteral'
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
}

export type Location = {
  __typename?: 'Location'
  bounds?: Maybe<Array<Maybe<LatLngLiteral>>>
  city?: Maybe<Scalars['String']>
  country?: Maybe<Scalars['String']>
  geojson?: Maybe<GeoJson>
  id: Scalars['String']
  latitude?: Maybe<Scalars['Float']>
  longitude?: Maybe<Scalars['Float']>
  zipcode?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<CreateUserPayload>
  forgotPassword?: Maybe<ForgotPasswordPayload>
  resendVerificationEmail?: Maybe<ResendVerificationEmail>
  reserve?: Maybe<ReservePayload>
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

export type MutationReserveArgs = {
  input?: InputMaybe<ReserveInput>
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

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
}

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  author?: Maybe<Author>
  book?: Maybe<Book>
  reservation?: Maybe<Reservation>
  searchBooks: BookConnection
  topics: Array<Topic>
  user?: Maybe<User>
}

export type QueryAuthorArgs = {
  id: Scalars['String']
}

export type QueryBookArgs = {
  id?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

export type QueryReservationArgs = {
  id: Scalars['String']
}

export type QuerySearchBooksArgs = {
  input: SearchBooksInput
}

export type QueryUserArgs = {
  id: Scalars['String']
}

export type ResendVerificationEmail = {
  __typename?: 'ResendVerificationEmail'
  message?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
}

export type Reservation = {
  __typename?: 'Reservation'
  id: Scalars['String']
  state?: Maybe<EReservationState>
  subState?: Maybe<EReservationChangeRequestState>
}

export type ReserveInput = {
  bookId: Scalars['String']
}

export type ReservePayload = {
  __typename?: 'ReservePayload'
  message?: Maybe<Scalars['String']>
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

export type SearchBooksInput = {
  filters: BookFilters
  pagination: Pagination
  sort?: InputMaybe<BookSort>
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

export type Topic = {
  __typename?: 'Topic'
  id: Scalars['String']
  name: Scalars['String']
}

export type User = {
  __typename?: 'User'
  books: BookConnection
  countryCode?: Maybe<ECountryCode>
  createdAt: Scalars['Date']
  email: Scalars['String']
  firstName: Scalars['String']
  id: Scalars['String']
  initial: Scalars['String']
  isEmailValidated: Scalars['Boolean']
  lastName: Scalars['String']
  location?: Maybe<Location>
  name?: Maybe<Scalars['String']>
  role: EUserRole
  type: EUserType
  username: Scalars['String']
}

export type UserConnection = {
  __typename?: 'UserConnection'
  nodes: Array<User>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
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

export type BookDetailsFragmentFragment = {
  __typename?: 'Book'
  id: string
  slug: string
  title?: string | null
  subtitle?: string | null
  cover?: string | null
  numPages: number
  language?: ELanguage | null
  description?: string | null
  date: string
  author?: { __typename?: 'Author'; name: string } | null
  owner: {
    __typename?: 'User'
    name?: string | null
    createdAt: any
    location?: {
      __typename?: 'Location'
      zipcode?: string | null
      latitude?: number | null
      longitude?: number | null
      city?: string | null
      country?: string | null
      geojson?: { __typename?: 'GeoJSON'; type?: string | null; coordinates?: any | null } | null
      bounds?: Array<{ __typename?: 'LatLngLiteral'; lat?: number | null; lng?: number | null } | null> | null
    } | null
  }
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
    owner: { __typename?: 'User'; id: string; firstName: string; lastName: string; createdAt: any }
  } | null
}

export type BookBySlugQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type BookBySlugQuery = {
  __typename?: 'Query'
  book?: {
    __typename?: 'Book'
    id: string
    slug: string
    title?: string | null
    subtitle?: string | null
    cover?: string | null
    numPages: number
    language?: ELanguage | null
    description?: string | null
    date: string
    author?: { __typename?: 'Author'; name: string } | null
    owner: {
      __typename?: 'User'
      name?: string | null
      createdAt: any
      location?: {
        __typename?: 'Location'
        zipcode?: string | null
        latitude?: number | null
        longitude?: number | null
        city?: string | null
        country?: string | null
        geojson?: { __typename?: 'GeoJSON'; type?: string | null; coordinates?: any | null } | null
        bounds?: Array<{
          __typename?: 'LatLngLiteral'
          lat?: number | null
          lng?: number | null
        } | null> | null
      } | null
    }
  } | null
}

export type SearchBooksQueryVariables = Exact<{
  input: SearchBooksInput
}>

export type SearchBooksQuery = {
  __typename?: 'Query'
  searchBooks: {
    __typename?: 'BookConnection'
    totalCount: number
    nodes: Array<{
      __typename?: 'Book'
      id: string
      title?: string | null
      cover?: string | null
      date: string
      slug: string
    }>
    pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean; hasPreviousPage: boolean }
  }
}

export type TopicsQueryVariables = Exact<{ [key: string]: never }>

export type TopicsQuery = {
  __typename?: 'Query'
  topics: Array<{ __typename?: 'Topic'; id: string; name: string }>
}
