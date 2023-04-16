/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graph/types";
export namespace UserModule {
  interface DefinedFields {
    User: 'id' | 'books' | 'countryCode' | 'email' | 'firstName' | 'initial' | 'isEmailValidated' | 'lastName' | 'name' | 'role' | 'type' | 'username' | 'createdAt' | 'location';
    UserConnection: 'nodes' | 'pageInfo' | 'totalCount';
    CreateUserPayload: 'message' | 'success' | 'user';
    VerifyEmailPayload: 'success' | 'message';
    ReservePayload: 'message';
    Query: 'user';
    Mutation: 'createUser' | 'verifyEmail' | 'reserve';
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
    ReserveInput: 'bookId';
  };
  
  export type EUserType = DefinedEnumValues['EUserType'];
  export type EUserRole = DefinedEnumValues['EUserRole'];
  export type EAdminRole = DefinedEnumValues['EAdminRole'];
  export type ECountryCode = DefinedEnumValues['ECountryCode'];
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type BookConnection = Types.BookConnection;
  export type Date = Types.Date;
  export type Location = Types.Location;
  export type UserConnection = Pick<Types.UserConnection, DefinedFields['UserConnection']>;
  export type PageInfo = Types.PageInfo;
  export type CreateUserInput = Pick<Types.CreateUserInput, DefinedInputFields['CreateUserInput']>;
  export type CreateUserPayload = Pick<Types.CreateUserPayload, DefinedFields['CreateUserPayload']>;
  export type VerifyEmailInput = Pick<Types.VerifyEmailInput, DefinedInputFields['VerifyEmailInput']>;
  export type VerifyEmailPayload = Pick<Types.VerifyEmailPayload, DefinedFields['VerifyEmailPayload']>;
  export type ReserveInput = Pick<Types.ReserveInput, DefinedInputFields['ReserveInput']>;
  export type ReservePayload = Pick<Types.ReservePayload, DefinedFields['ReservePayload']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type UserConnectionResolvers = Pick<Types.UserConnectionResolvers, DefinedFields['UserConnection'] | '__isTypeOf'>;
  export type CreateUserPayloadResolvers = Pick<Types.CreateUserPayloadResolvers, DefinedFields['CreateUserPayload'] | '__isTypeOf'>;
  export type VerifyEmailPayloadResolvers = Pick<Types.VerifyEmailPayloadResolvers, DefinedFields['VerifyEmailPayload'] | '__isTypeOf'>;
  export type ReservePayloadResolvers = Pick<Types.ReservePayloadResolvers, DefinedFields['ReservePayload'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    User?: UserResolvers;
    UserConnection?: UserConnectionResolvers;
    CreateUserPayload?: CreateUserPayloadResolvers;
    VerifyEmailPayload?: VerifyEmailPayloadResolvers;
    ReservePayload?: ReservePayloadResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
}