/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graph/types";
export namespace TopicModule {
  interface DefinedFields {
    Topic: 'id' | 'name';
    Query: 'topics';
  };
  
  export type Topic = Pick<Types.Topic, DefinedFields['Topic']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type TopicResolvers = Pick<Types.TopicResolvers, DefinedFields['Topic'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Topic?: TopicResolvers;
    Query?: QueryResolvers;
  };
}