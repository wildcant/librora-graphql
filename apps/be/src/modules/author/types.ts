/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../graphql-types";
export namespace AuthorModule {
  interface DefinedFields {
    Editorial: 'name';
    Author: 'id' | 'name';
    Query: 'author';
  };
  
  export type Editorial = Pick<Types.Editorial, DefinedFields['Editorial']>;
  export type Author = Pick<Types.Author, DefinedFields['Author']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type EditorialResolvers = Pick<Types.EditorialResolvers, DefinedFields['Editorial'] | '__isTypeOf'>;
  export type AuthorResolvers = Pick<Types.AuthorResolvers, DefinedFields['Author'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Editorial?: EditorialResolvers;
    Author?: AuthorResolvers;
    Query?: QueryResolvers;
  };
}