import { ActionModel, AuthorModel, BookModel, TopicModel, UserModel, LocationModel } from 'schemas'
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    books: BookModel
    books_composite: Knex.CompositeTableType<
      // This interface will be used for return type and `where`, `having` etc where full type is required
      BookModel,
      // Specifying "insert" type will also make sure
      // data matches interface in full. Meaning
      // if interface is `{ a: string, b: string }`,
      // `insert({ a: '' })` will complain about missing fields.
      //
      // For example, this will require only "name" field when inserting
      // and make created_at and updated_at optional.
      // And "id" can't be provided at all.
      // Defaults to "base" type.
      Pick<BookModel, 'title' | 'author'> & Partial<Pick<BookModel, 'cover'>>,
      // This interface is used for "update()" calls.
      // As opposed to regular specifying interface only once,
      // when specifying separate update interface, user will be
      // required to match it  exactly. So it's recommended to
      // provide partial interfaces for "update". Unless you want to always
      // require some field (e.g., `Partial<User> & { updated_at: string }`
      // will allow updating any field for User but require updated_at to be
      // always provided as well.
      //
      // For example, this wil allow updating all fields except "id".
      // "id" will still be usable for `where` clauses so
      //      knex('users_composite')
      //      .update({ name: 'name2' })
      //      .where('id', 10)`
      // will still work.
      // Defaults to Partial "insert" type
      Partial<Omit<BookModel, 'id'>>
    >

    actions: ActionModel
    actions_composite: Knex.CompositeTableType<
      ActionModel,
      Partial<Omit<ActionModel, 'id'>>,
      Partial<Omit<ActionModel, 'id'>>
    >

    authors: AuthorModel
    authors_composite: Knex.CompositeTableType<
      AuthorModel,
      Partial<Omit<AuthorModel, 'id'>>,
      Partial<Omit<AuthorModel, 'id'>>
    >

    users: UserModel
    users_composite: Knex.CompositeTableType<
      UserModel,
      Partial<Omit<UserModel, 'id'>>,
      Partial<Omit<UserModel, 'id'>>
    >

    topics: TopicModel
    topics_composite: Knex.CompositeTableType<
      TopicModel,
      Partial<Omit<TopicModel, 'id'>>,
      Partial<Omit<TopicModel, 'id'>>
    >

    locations: LocationModel
    locations_composite: Knex.CompositeTableType<
      LocationModel,
      Partial<Omit<LocationModel, 'id'>>,
      Partial<Omit<LocationModel, 'id'>>
    >
  }
}

/**
 * Setup a one time declaration to make knex use number as result type for all
 * count and countDistinct invocations (for any table)
 * Note: This is convenient when working with tables without large amounts of rows, it could bring issues otherwise.
 * @see https://knexjs.org/guide/query-builder.html#count
 */
declare module 'knex/types/result' {
  interface Registry {
    Count: number
  }
}
