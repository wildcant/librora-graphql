/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* eslint-disable */

import * as Types from "../../graphql/types";
export namespace BookModule {
  interface DefinedFields {
    Book: 'id' | 'author' | 'cover' | 'coverThumbnail' | 'date' | 'description' | 'editorial' | 'format' | 'language' | 'numPages' | 'slug' | 'subtitle' | 'title' | 'owner';
    BookConnection: 'nodes' | 'pageInfo' | 'totalCount';
    Query: 'book' | 'searchBooks';
  };
  
  interface DefinedEnumValues {
    EFormat: 'EPUB' | 'PDF' | 'BOOK';
    ELanguage: 'ENGLISH';
  };
  
  interface DefinedInputFields {
    BookFilters: 'freeText' | 'author' | 'language';
    Pagination: 'offset' | 'limit';
    BookSort: 'by' | 'order';
    SearchBooksInput: 'filters' | 'sort' | 'pagination';
  };
  
  export type EFormat = DefinedEnumValues['EFormat'];
  export type ELanguage = DefinedEnumValues['ELanguage'];
  export type Book = Pick<Types.Book, DefinedFields['Book']>;
  export type Author = Types.Author;
  export type Editorial = Types.Editorial;
  export type User = Types.User;
  export type BookConnection = Pick<Types.BookConnection, DefinedFields['BookConnection']>;
  export type PageInfo = Types.PageInfo;
  export type BookFilters = Pick<Types.BookFilters, DefinedInputFields['BookFilters']>;
  export type Pagination = Pick<Types.Pagination, DefinedInputFields['Pagination']>;
  export type BookSort = Pick<Types.BookSort, DefinedInputFields['BookSort']>;
  export type ESort = Types.ESort;
  export type SearchBooksInput = Pick<Types.SearchBooksInput, DefinedInputFields['SearchBooksInput']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  
  export type BookResolvers = Pick<Types.BookResolvers, DefinedFields['Book'] | '__isTypeOf'>;
  export type BookConnectionResolvers = Pick<Types.BookConnectionResolvers, DefinedFields['BookConnection'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  
  export interface Resolvers {
    Book?: BookResolvers;
    BookConnection?: BookConnectionResolvers;
    Query?: QueryResolvers;
  };
}