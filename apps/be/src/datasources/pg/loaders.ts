import DataLoader from 'dataloader'
import { ActionModel, AuthorModel, BookModel, UserModel } from 'schemas'
import { mapTo } from '../utils'
import { knex } from './knex'

/**
 * Data Loaders.
 */
export const loaders = {
  /**
   * Book
   */
  bookById: new DataLoader<string, BookModel | null>((keys) =>
    knex('books')
      .whereIn('id', keys)
      .select()
      .then((rows) => mapTo(rows, keys, (x) => x.id))
  ),
  authorById: new DataLoader<string, AuthorModel | null>((keys) =>
    knex('authors')
      .whereIn('id', keys)
      .select()
      .then((rows) => mapTo(rows, keys, (x) => x.id))
  ),

  /**
   * User
   */
  userById: new DataLoader<string, UserModel | null>((keys) =>
    knex('users')
      .whereIn('id', keys)
      .select()
      .then((rows) => mapTo(rows, keys, (x) => x.id))
  ),
  userByEmail: new DataLoader<string, UserModel | null>((keys) =>
    knex('users')
      .whereIn('email', keys)
      .select()
      .then((rows) => mapTo(rows, keys, (x) => x.email))
  ),
  userByUsername: new DataLoader<string, UserModel | null>((keys) =>
    knex('users')
      .whereIn('username', keys)
      .select()
      .then((rows) => mapTo(rows, keys, (x) => x.username))
  ),

  /**
   * Action.
   */
  userActionById: new DataLoader<string, ActionModel | null>(
    (keys) =>
      knex('actions')
        .whereIn('id', keys)
        .select()
        .then((rows) => mapTo(rows, keys, (x) => x.id)),
    { cache: false }
  ),
}
