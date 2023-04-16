/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graph/types";
export namespace ActionModule {
  interface DefinedFields {
    ValidateActionPayload: 'message' | 'valid';
    ResendVerificationEmail: 'success' | 'message';
    Mutation: 'validateAction' | 'resendVerificationEmail';
  };
  
  export type ValidateActionPayload = Pick<Types.ValidateActionPayload, DefinedFields['ValidateActionPayload']>;
  export type ResendVerificationEmail = Pick<Types.ResendVerificationEmail, DefinedFields['ResendVerificationEmail']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  
  export type ValidateActionPayloadResolvers = Pick<Types.ValidateActionPayloadResolvers, DefinedFields['ValidateActionPayload'] | '__isTypeOf'>;
  export type ResendVerificationEmailResolvers = Pick<Types.ResendVerificationEmailResolvers, DefinedFields['ResendVerificationEmail'] | '__isTypeOf'>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  
  export interface Resolvers {
    ValidateActionPayload?: ValidateActionPayloadResolvers;
    ResendVerificationEmail?: ResendVerificationEmailResolvers;
    Mutation?: MutationResolvers;
  };
}