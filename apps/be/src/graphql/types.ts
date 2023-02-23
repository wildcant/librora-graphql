/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import { GraphQLResolveInfo } from 'graphql';
import { BookModel, AuthorModel, PublicUserModel, ActionModel } from '@librora/schemas';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type AuthorConnection = {
  __typename?: 'AuthorConnection';
  nodes: Array<Author>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  cover?: Maybe<Scalars['String']>;
  coverThumbnail?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  editorial?: Maybe<Editorial>;
  format?: Maybe<EFormat>;
  id: Scalars['String'];
  language?: Maybe<ELanguage>;
  numPages: Scalars['Int'];
  slug: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user: User;
};

export type BookConnection = {
  __typename?: 'BookConnection';
  nodes: Array<Book>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BookFilters = {
  author?: InputMaybe<Scalars['ID']>;
  freeText: Scalars['String'];
  language?: InputMaybe<ELanguage>;
};

export type BookSort = {
  by?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<ESort>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type EAdminRole =
  | 'BILLING'
  | 'SUPER';

export type ECountryCode =
  | 'CO';

export type EFormat =
  | 'BOOK'
  | 'EPUB'
  | 'PDF';

export type ELanguage =
  | 'ENGLISH';

export type EReservationChangeRequestState =
  | 'CHANGE_CANCELLED'
  | 'CHANGE_CONFIRMED'
  | 'CHANGE_DENIED'
  | 'CHANGE_PENDING';

export type EReservationState =
  | 'ACTIVE'
  | 'CANCELED'
  | 'CONFIRMED'
  | 'DENIED'
  | 'EXPIRED'
  | 'PENDING'
  | 'RETURNED'
  | 'WITHDRAWN';

export type ESort =
  | 'ASC'
  | 'DESC';

export type EUserRole =
  | 'LENDER_BORROWER'
  | 'VISITOR';

export type EUserType =
  | 'ADMIN'
  | 'USER';

export type Editorial = {
  __typename?: 'Editorial';
  name?: Maybe<Scalars['String']>;
};

export type EditorialConnection = {
  __typename?: 'EditorialConnection';
  nodes: Array<Editorial>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordPayload = {
  __typename?: 'ForgotPasswordPayload';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserPayload>;
  forgotPassword?: Maybe<ForgotPasswordPayload>;
  resendVerificationEmail?: Maybe<ResendVerificationEmail>;
  resetPassword?: Maybe<ResetPasswordPayload>;
  signIn?: Maybe<SignInPayload>;
  validateAction?: Maybe<ValidateActionPayload>;
  verifyEmail?: Maybe<VerifyEmailPayload>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationResendVerificationEmailArgs = {
  token: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationValidateActionArgs = {
  id: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
};

export type Pagination = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  book?: Maybe<Book>;
  reservation?: Maybe<Reservation>;
  searchBooks: BookConnection;
  topics: Array<Topic>;
  user?: Maybe<User>;
};


export type QueryAuthorArgs = {
  id: Scalars['String'];
};


export type QueryBookArgs = {
  id?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};


export type QueryReservationArgs = {
  id: Scalars['String'];
};


export type QuerySearchBooksArgs = {
  input: SearchBooksInput;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type ResendVerificationEmail = {
  __typename?: 'ResendVerificationEmail';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['String'];
  state?: Maybe<EReservationState>;
  subState?: Maybe<EReservationChangeRequestState>;
};

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type SearchBooksInput = {
  filters: BookFilters;
  pagination: Pagination;
  sort?: InputMaybe<BookSort>;
};

export type SignInInput = {
  account: Scalars['String'];
  password: Scalars['String'];
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  books: BookConnection;
  countryCode?: Maybe<ECountryCode>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  initial: Scalars['String'];
  isEmailValidated: Scalars['Boolean'];
  lastName: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  role: EUserRole;
  type: EUserType;
  username: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  nodes: Array<User>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ValidateActionPayload = {
  __typename?: 'ValidateActionPayload';
  message?: Maybe<Scalars['String']>;
  valid: Scalars['Boolean'];
};

export type VerifyEmailInput = {
  token: Scalars['String'];
};

export type VerifyEmailPayload = {
  __typename?: 'VerifyEmailPayload';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<AuthorModel>;
  AuthorConnection: ResolverTypeWrapper<Omit<AuthorConnection, 'nodes'> & { nodes: Array<ResolversTypes['Author']> }>;
  Book: ResolverTypeWrapper<BookModel>;
  BookConnection: ResolverTypeWrapper<Omit<BookConnection, 'nodes'> & { nodes: Array<ResolversTypes['Book']> }>;
  BookFilters: BookFilters;
  BookSort: BookSort;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserInput: CreateUserInput;
  CreateUserPayload: ResolverTypeWrapper<Omit<CreateUserPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  EAdminRole: EAdminRole;
  ECountryCode: ECountryCode;
  EFormat: EFormat;
  ELanguage: ELanguage;
  EReservationChangeRequestState: EReservationChangeRequestState;
  EReservationState: EReservationState;
  ESort: ESort;
  EUserRole: EUserRole;
  EUserType: EUserType;
  Editorial: ResolverTypeWrapper<Editorial>;
  EditorialConnection: ResolverTypeWrapper<EditorialConnection>;
  ForgotPasswordInput: ForgotPasswordInput;
  ForgotPasswordPayload: ResolverTypeWrapper<ForgotPasswordPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Pagination: Pagination;
  Query: ResolverTypeWrapper<{}>;
  ResendVerificationEmail: ResolverTypeWrapper<ResendVerificationEmail>;
  Reservation: ResolverTypeWrapper<Reservation>;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: ResolverTypeWrapper<Omit<ResetPasswordPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  SearchBooksInput: SearchBooksInput;
  SignInInput: SignInInput;
  SignInPayload: ResolverTypeWrapper<Omit<SignInPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Topic: ResolverTypeWrapper<Topic>;
  User: ResolverTypeWrapper<PublicUserModel>;
  UserConnection: ResolverTypeWrapper<Omit<UserConnection, 'nodes'> & { nodes: Array<ResolversTypes['User']> }>;
  ValidateActionPayload: ResolverTypeWrapper<ValidateActionPayload>;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailPayload: ResolverTypeWrapper<VerifyEmailPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: AuthorModel;
  AuthorConnection: Omit<AuthorConnection, 'nodes'> & { nodes: Array<ResolversParentTypes['Author']> };
  Book: BookModel;
  BookConnection: Omit<BookConnection, 'nodes'> & { nodes: Array<ResolversParentTypes['Book']> };
  BookFilters: BookFilters;
  BookSort: BookSort;
  Boolean: Scalars['Boolean'];
  CreateUserInput: CreateUserInput;
  CreateUserPayload: Omit<CreateUserPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  Editorial: Editorial;
  EditorialConnection: EditorialConnection;
  ForgotPasswordInput: ForgotPasswordInput;
  ForgotPasswordPayload: ForgotPasswordPayload;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PageInfo: PageInfo;
  Pagination: Pagination;
  Query: {};
  ResendVerificationEmail: ResendVerificationEmail;
  Reservation: Reservation;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: Omit<ResetPasswordPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  SearchBooksInput: SearchBooksInput;
  SignInInput: SignInInput;
  SignInPayload: Omit<SignInPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  String: Scalars['String'];
  Topic: Topic;
  User: PublicUserModel;
  UserConnection: Omit<UserConnection, 'nodes'> & { nodes: Array<ResolversParentTypes['User']> };
  ValidateActionPayload: ValidateActionPayload;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailPayload: VerifyEmailPayload;
};

export type AuthorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthorConnection'] = ResolversParentTypes['AuthorConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverThumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editorial?: Resolver<Maybe<ResolversTypes['Editorial']>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['EFormat']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['ELanguage']>, ParentType, ContextType>;
  numPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BookConnection'] = ResolversParentTypes['BookConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['Book']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditorialResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Editorial'] = ResolversParentTypes['Editorial']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditorialConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EditorialConnection'] = ResolversParentTypes['EditorialConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['Editorial']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ForgotPasswordPayload'] = ResolversParentTypes['ForgotPasswordPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserPayload']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['ForgotPasswordPayload']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'input'>>;
  resendVerificationEmail?: Resolver<Maybe<ResolversTypes['ResendVerificationEmail']>, ParentType, ContextType, RequireFields<MutationResendVerificationEmailArgs, 'token'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPasswordPayload']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SignInPayload']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  validateAction?: Resolver<Maybe<ResolversTypes['ValidateActionPayload']>, ParentType, ContextType, RequireFields<MutationValidateActionArgs, 'id'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['VerifyEmailPayload']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'input'>>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>;
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, Partial<QueryBookArgs>>;
  reservation?: Resolver<Maybe<ResolversTypes['Reservation']>, ParentType, ContextType, RequireFields<QueryReservationArgs, 'id'>>;
  searchBooks?: Resolver<ResolversTypes['BookConnection'], ParentType, ContextType, RequireFields<QuerySearchBooksArgs, 'input'>>;
  topics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type ResendVerificationEmailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResendVerificationEmail'] = ResolversParentTypes['ResendVerificationEmail']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReservationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Reservation'] = ResolversParentTypes['Reservation']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['EReservationState']>, ParentType, ContextType>;
  subState?: Resolver<Maybe<ResolversTypes['EReservationChangeRequestState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResetPasswordPayload'] = ResolversParentTypes['ResetPasswordPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignInPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignInPayload'] = ResolversParentTypes['SignInPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  books?: Resolver<ResolversTypes['BookConnection'], ParentType, ContextType>;
  countryCode?: Resolver<Maybe<ResolversTypes['ECountryCode']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initial?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isEmailValidated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['EUserRole'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EUserType'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  nodes?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateActionPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ValidateActionPayload'] = ResolversParentTypes['ValidateActionPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyEmailPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VerifyEmailPayload'] = ResolversParentTypes['VerifyEmailPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Author?: AuthorResolvers<ContextType>;
  AuthorConnection?: AuthorConnectionResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  BookConnection?: BookConnectionResolvers<ContextType>;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  Editorial?: EditorialResolvers<ContextType>;
  EditorialConnection?: EditorialConnectionResolvers<ContextType>;
  ForgotPasswordPayload?: ForgotPasswordPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResendVerificationEmail?: ResendVerificationEmailResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  ResetPasswordPayload?: ResetPasswordPayloadResolvers<ContextType>;
  SignInPayload?: SignInPayloadResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  ValidateActionPayload?: ValidateActionPayloadResolvers<ContextType>;
  VerifyEmailPayload?: VerifyEmailPayloadResolvers<ContextType>;
};

