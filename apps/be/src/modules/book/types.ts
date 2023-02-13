/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../graphql-types";
export namespace BookModule {
  interface DefinedFields {
    Book: 'id' | 'author' | 'cover' | 'description' | 'editorial' | 'format' | 'language' | 'subtitle' | 'title' | 'user';
    Query: 'books' | 'book' | 'searchBooks';
  };
  
  interface DefinedEnumValues {
    EFormat: 'EPUB' | 'PDF' | 'BOOK';
    ELanguage: 'ENGLISH';
  };
  
  export type EFormat = DefinedEnumValues['EFormat'];
  export type ELanguage = DefinedEnumValues['ELanguage'];
  export type Book = Pick<Types.Book, DefinedFields['Book']>;
  export type Author = Types.Author;
  export type Editorial = Types.Editorial;
  export type User = Types.User;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type BookResolvers = Pick<Types.BookResolvers, DefinedFields['Book'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Book?: BookResolvers;
    Query?: QueryResolvers;
  };
}