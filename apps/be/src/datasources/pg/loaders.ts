import { ActionModel, AuthorModel, BookModel, UserModel } from '@librora/schemas'
import DataLoader, { Options } from 'dataloader'
import { mapTo } from '../utils'
import { knex } from './knex'

type LoadFnKey<T> = { value: string; select?: (keyof T)[] }
type CreateLoader<T> = { table: string; key: keyof T; options?: Options<LoadFnKey<T>, T> }

function createLoader<T>({ table, key: keyName, options }: CreateLoader<T>) {
  return new DataLoader<LoadFnKey<T>, T | null>((keys) => {
    const keyValues = keys.map(({ value }) => value)
    const selection = keys[0].select ?? ['*']

    return knex(table)
      .whereIn(keyName as string, keyValues)
      .select(selection)
      .then((rows) => mapTo(rows, keyValues, (x) => x[keyName]))
  }, options)
}

/** Data Loaders. */
export const loaders = {
  /** Book */
  bookById: createLoader<BookModel>({ table: 'books', key: 'id' }),

  /** Author */
  authorById: createLoader<AuthorModel>({ table: 'authors', key: 'id' }),

  /** User */
  userById: createLoader<UserModel>({ table: 'users', key: 'id' }),
  userByEmail: createLoader<UserModel>({ table: 'users', key: 'email' }),
  userByUsername: createLoader<UserModel>({ table: 'users', key: 'username' }),

  /** Action. */
  userActionById: createLoader<ActionModel>({ table: 'actions', key: 'id', options: { cache: false } }),
}
