/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../graphql-types";
export namespace UserModule {
  interface DefinedFields {
    User: 'id' | 'countryCode' | 'email' | 'firstName' | 'isEmailValidated' | 'lastName' | 'role' | 'type' | 'username' | 'initial' | 'books' | 'name';
    CreateUserPayload: 'user' | 'success' | 'message';
    VerifyEmailPayload: 'success' | 'message';
    Query: 'user';
    Mutation: 'createUser' | 'verifyEmail';
  };
  
  interface DefinedEnumValues {
    EUserType: 'ADMIN' | 'USER';
    EUserRole: 'LENDER_BORROWER' | 'VISITOR';
    EAdminRole: 'SUPER' | 'BILLING';
    ECountryCode: 'CO';
  };
  
  interface DefinedInputFields {
    CreateUserInput: 'email' | 'firstName' | 'lastName' | 'password' | 'username';
    VerifyEmailInput: 'token';
  };
  
  export type EUserType = DefinedEnumValues['EUserType'];
  export type EUserRole = DefinedEnumValues['EUserRole'];
  export type EAdminRole = DefinedEnumValues['EAdminRole'];
  export type ECountryCode = DefinedEnumValues['ECountryCode'];
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type Book = Types.Book;
  export type CreateUserInput = Pick<Types.CreateUserInput, DefinedInputFields['CreateUserInput']>;
  export type CreateUserPayload = Pick<Types.CreateUserPayload, DefinedFields['CreateUserPayload']>;
  export type VerifyEmailInput = Pick<Types.VerifyEmailInput, DefinedInputFields['VerifyEmailInput']>;
  export type VerifyEmailPayload = Pick<Types.VerifyEmailPayload, DefinedFields['VerifyEmailPayload']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type CreateUserPayloadResolvers = Pick<Types.CreateUserPayloadResolvers, DefinedFields['CreateUserPayload'] | '__isTypeOf'>;
  export type VerifyEmailPayloadResolvers = Pick<Types.VerifyEmailPayloadResolvers, DefinedFields['VerifyEmailPayload'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    User?: UserResolvers;
    CreateUserPayload?: CreateUserPayloadResolvers;
    VerifyEmailPayload?: VerifyEmailPayloadResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
}