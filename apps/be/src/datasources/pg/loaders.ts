import DataLoader from 'dataloader'
import { AuthorModel } from './author'
import { BookModel } from './book'
import { knex } from './knex'
import { mapTo } from '../utils'
import { UserModel } from './user'

/**
 * Data Loaders.
 */
export const loaders = {
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
  userById: new DataLoader<string, UserModel | null>((keys) =>
    knex('users')
      .whereIn('id', keys)
      .select()
      .then((rows) => mapTo(rows, keys, (x) => x.id))
  ),
}
