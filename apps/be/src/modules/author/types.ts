/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graph/types";
export namespace AuthorModule {
  interface DefinedFields {
    Editorial: 'name';
    EditorialConnection: 'nodes' | 'pageInfo' | 'totalCount';
    Author: 'id' | 'name';
    AuthorConnection: 'nodes' | 'pageInfo' | 'totalCount';
    Query: 'author';
  };
  
  export type Editorial = Pick<Types.Editorial, DefinedFields['Editorial']>;
  export type EditorialConnection = Pick<Types.EditorialConnection, DefinedFields['EditorialConnection']>;
  export type PageInfo = Types.PageInfo;
  export type Author = Pick<Types.Author, DefinedFields['Author']>;
  export type AuthorConnection = Pick<Types.AuthorConnection, DefinedFields['AuthorConnection']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type EditorialResolvers = Pick<Types.EditorialResolvers, DefinedFields['Editorial'] | '__isTypeOf'>;
  export type EditorialConnectionResolvers = Pick<Types.EditorialConnectionResolvers, DefinedFields['EditorialConnection'] | '__isTypeOf'>;
  export type AuthorResolvers = Pick<Types.AuthorResolvers, DefinedFields['Author'] | '__isTypeOf'>;
  export type AuthorConnectionResolvers = Pick<Types.AuthorConnectionResolvers, DefinedFields['AuthorConnection'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Editorial?: EditorialResolvers;
    EditorialConnection?: EditorialConnectionResolvers;
    Author?: AuthorResolvers;
    AuthorConnection?: AuthorConnectionResolvers;
    Query?: QueryResolvers;
  };
}