/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import { GraphQLResolveInfo } from 'graphql';
import { BookModel, AuthorModel, UserModel, ActionModel } from 'schemas';
import { IContext } from '../context';
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

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  description?: Maybe<Scalars['String']>;
  editorial?: Maybe<Editorial>;
  format?: Maybe<EFormat>;
  id: Scalars['String'];
  language?: Maybe<ELanguage>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
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

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  user?: Maybe<User>;
};


export type QueryAuthorArgs = {
  id: Scalars['String'];
};


export type QueryBookArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type ResendVerificationEmail = {
  __typename?: 'ResendVerificationEmail';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
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

export type User = {
  __typename?: 'User';
  countryCode?: Maybe<ECountryCode>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  initial: Scalars['String'];
  isEmailValidated: Scalars['Boolean'];
  lastName: Scalars['String'];
  role: EUserRole;
  type: EUserType;
  username: Scalars['String'];
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
  Book: ResolverTypeWrapper<BookModel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserInput: CreateUserInput;
  CreateUserPayload: ResolverTypeWrapper<Omit<CreateUserPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  EAdminRole: EAdminRole;
  ECountryCode: ECountryCode;
  EFormat: EFormat;
  ELanguage: ELanguage;
  EUserRole: EUserRole;
  EUserType: EUserType;
  Editorial: ResolverTypeWrapper<Editorial>;
  ForgotPasswordInput: ForgotPasswordInput;
  ForgotPasswordPayload: ResolverTypeWrapper<ForgotPasswordPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ResendVerificationEmail: ResolverTypeWrapper<ResendVerificationEmail>;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: ResolverTypeWrapper<Omit<ResetPasswordPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  SignInInput: SignInInput;
  SignInPayload: ResolverTypeWrapper<Omit<SignInPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<UserModel>;
  ValidateActionPayload: ResolverTypeWrapper<ValidateActionPayload>;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailPayload: ResolverTypeWrapper<VerifyEmailPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: AuthorModel;
  Book: BookModel;
  Boolean: Scalars['Boolean'];
  CreateUserInput: CreateUserInput;
  CreateUserPayload: Omit<CreateUserPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  Editorial: Editorial;
  ForgotPasswordInput: ForgotPasswordInput;
  ForgotPasswordPayload: ForgotPasswordPayload;
  Mutation: {};
  Query: {};
  ResendVerificationEmail: ResendVerificationEmail;
  ResetPasswordInput: ResetPasswordInput;
  ResetPasswordPayload: Omit<ResetPasswordPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  SignInInput: SignInInput;
  SignInPayload: Omit<SignInPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  String: Scalars['String'];
  User: UserModel;
  ValidateActionPayload: ValidateActionPayload;
  VerifyEmailInput: VerifyEmailInput;
  VerifyEmailPayload: VerifyEmailPayload;
};

export type AuthorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editorial?: Resolver<Maybe<ResolversTypes['Editorial']>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['EFormat']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['ELanguage']>, ParentType, ContextType>;
  subtitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserPayloadResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditorialResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Editorial'] = ResolversParentTypes['Editorial']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordPayloadResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ForgotPasswordPayload'] = ResolversParentTypes['ForgotPasswordPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserPayload']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['ForgotPasswordPayload']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'input'>>;
  resendVerificationEmail?: Resolver<Maybe<ResolversTypes['ResendVerificationEmail']>, ParentType, ContextType, RequireFields<MutationResendVerificationEmailArgs, 'token'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['ResetPasswordPayload']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'input'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SignInPayload']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  validateAction?: Resolver<Maybe<ResolversTypes['ValidateActionPayload']>, ParentType, ContextType, RequireFields<MutationValidateActionArgs, 'id'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['VerifyEmailPayload']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'input'>>;
};

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>;
  book?: Resolver<Maybe<ResolversTypes['Book']>, ParentType, ContextType, RequireFields<QueryBookArgs, 'id'>>;
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type ResendVerificationEmailResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ResendVerificationEmail'] = ResolversParentTypes['ResendVerificationEmail']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordPayloadResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ResetPasswordPayload'] = ResolversParentTypes['ResetPasswordPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignInPayloadResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['SignInPayload'] = ResolversParentTypes['SignInPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  countryCode?: Resolver<Maybe<ResolversTypes['ECountryCode']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  initial?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isEmailValidated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['EUserRole'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['EUserType'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateActionPayloadResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ValidateActionPayload'] = ResolversParentTypes['ValidateActionPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valid?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyEmailPayloadResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['VerifyEmailPayload'] = ResolversParentTypes['VerifyEmailPayload']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = IContext> = {
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  Editorial?: EditorialResolvers<ContextType>;
  ForgotPasswordPayload?: ForgotPasswordPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ResendVerificationEmail?: ResendVerificationEmailResolvers<ContextType>;
  ResetPasswordPayload?: ResetPasswordPayloadResolvers<ContextType>;
  SignInPayload?: SignInPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidateActionPayload?: ValidateActionPayloadResolvers<ContextType>;
  VerifyEmailPayload?: VerifyEmailPayloadResolvers<ContextType>;
};

