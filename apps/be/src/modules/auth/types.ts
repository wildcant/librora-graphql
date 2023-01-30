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
    ForgotPasswordPayload: 'success' | 'message';
    ResetPasswordPayload: 'success' | 'message' | 'user';
    Mutation: 'signIn' | 'forgotPassword' | 'resetPassword';
  };
  
  interface DefinedInputFields {
    SignInInput: 'account' | 'password';
    ForgotPasswordInput: 'email';
    ResetPasswordInput: 'token' | 'newPassword';
  };
  
  export type SignInInput = Pick<Types.SignInInput, DefinedInputFields['SignInInput']>;
  export type SignInPayload = Pick<Types.SignInPayload, DefinedFields['SignInPayload']>;
  export type User = Types.User;
  export type ForgotPasswordInput = Pick<Types.ForgotPasswordInput, DefinedInputFields['ForgotPasswordInput']>;
  export type ForgotPasswordPayload = Pick<Types.ForgotPasswordPayload, DefinedFields['ForgotPasswordPayload']>;
  export type ResetPasswordInput = Pick<Types.ResetPasswordInput, DefinedInputFields['ResetPasswordInput']>;
  export type ResetPasswordPayload = Pick<Types.ResetPasswordPayload, DefinedFields['ResetPasswordPayload']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type SignInPayloadResolvers = Pick<Types.SignInPayloadResolvers, DefinedFields['SignInPayload'] | '__isTypeOf'>;
  export type ForgotPasswordPayloadResolvers = Pick<Types.ForgotPasswordPayloadResolvers, DefinedFields['ForgotPasswordPayload'] | '__isTypeOf'>;
  export type ResetPasswordPayloadResolvers = Pick<Types.ResetPasswordPayloadResolvers, DefinedFields['ResetPasswordPayload'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    SignInPayload?: SignInPayloadResolvers;
    ForgotPasswordPayload?: ForgotPasswordPayloadResolvers;
    ResetPasswordPayload?: ResetPasswordPayloadResolvers;
    Mutation?: MutationResolvers;
  };
}