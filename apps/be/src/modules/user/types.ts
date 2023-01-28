/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../graphql-types";
export namespace UserModule {
  interface DefinedFields {
    User: 'id' | 'countryCode' | 'email' | 'firstName' | 'isEmailValidated' | 'lastName' | 'role' | 'type' | 'username' | 'initial';
    CreateUserPayload: 'user' | 'success' | 'message';
    Query: 'user';
    Mutation: 'createUser';
  };
  
  interface DefinedEnumValues {
    EUserType: 'ADMIN' | 'USER';
    EUserRole: 'LENDER_BORROWER' | 'VISITOR';
    EAdminRole: 'SUPER' | 'BILLING';
    ECountryCode: 'CO' | 'us_en';
  };
  
  interface DefinedInputFields {
    CreateUserInput: 'email' | 'firstName' | 'lastName' | 'password' | 'username';
  };
  
  export type EUserType = DefinedEnumValues['EUserType'];
  export type EUserRole = DefinedEnumValues['EUserRole'];
  export type EAdminRole = DefinedEnumValues['EAdminRole'];
  export type ECountryCode = DefinedEnumValues['ECountryCode'];
  export type User = Pick<Types.User, DefinedFields['User']>;
  export type CreateUserInput = Pick<Types.CreateUserInput, DefinedInputFields['CreateUserInput']>;
  export type CreateUserPayload = Pick<Types.CreateUserPayload, DefinedFields['CreateUserPayload']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type UserResolvers = Pick<Types.UserResolvers, DefinedFields['User'] | '__isTypeOf'>;
  export type CreateUserPayloadResolvers = Pick<Types.CreateUserPayloadResolvers, DefinedFields['CreateUserPayload'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    User?: UserResolvers;
    CreateUserPayload?: CreateUserPayloadResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
  };
}