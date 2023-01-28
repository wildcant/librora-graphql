/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../graphql-types";
export namespace AuthModule {
  interface DefinedFields {
    SignInPayload: 'user' | 'success' | 'message';
    ResetPasswordPayload: 'success' | 'message';
    Mutation: 'signIn' | 'resetPassword';
  };
  
  interface DefinedInputFields {
    SignInInput: 'account' | 'password';
    ResetPasswordInput: 'email';
  };
  
  export type SignInInput = Pick<Types.SignInInput, DefinedInputFields['SignInInput']>;
  export type SignInPayload = Pick<Types.SignInPayload, DefinedFields['SignInPayload']>;
  export type User = Types.User;
  export type ResetPasswordInput = Pick<Types.ResetPasswordInput, DefinedInputFields['ResetPasswordInput']>;
  export type ResetPasswordPayload = Pick<Types.ResetPasswordPayload, DefinedFields['ResetPasswordPayload']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type SignInPayloadResolvers = Pick<Types.SignInPayloadResolvers, DefinedFields['SignInPayload'] | '__isTypeOf'>;
  export type ResetPasswordPayloadResolvers = Pick<Types.ResetPasswordPayloadResolvers, DefinedFields['ResetPasswordPayload'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    SignInPayload?: SignInPayloadResolvers;
    ResetPasswordPayload?: ResetPasswordPayloadResolvers;
    Mutation?: MutationResolvers;
  };
}