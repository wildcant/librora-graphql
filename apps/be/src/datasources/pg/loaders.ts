import { ActionModel, AuthorModel, BookModel, TopicModel, UserModel } from '@librora/schemas'
import DataLoader, { Options } from 'dataloader'
import { mapTo } from '../utils'
import { knex } from './knex'

type LoadFnKey<T> = { value: string; select?: (keyof T)[] }
type CreateLoader<T> = { table: string; key: keyof T; options?: Options<LoadFnKey<T>, T> }

function createLoader<T>({ table, key: keyName, options }: CreateLoader<T>) {
  return new DataLoader<LoadFnKey<T>, T | null>((keys) => {
    const keyValues = keys.map(({ value }) => value)
    const select = keys[0].select
    // Include key to selection in case it was not provided. We do this in order to map the results properly.
    if (select && !select.includes(keyName)) select.push(keyName)
    const selection = select ?? ['*']

    return knex(table)
      .whereIn(keyName as string, keyValues)
      .select(selection)
      .then((rows) => mapTo(rows, keyValues, (x) => x[keyName]))
  }, options)
}

/** Data Loaders. */
export const loaders = {
  /** Action. */
  actionById: createLoader<ActionModel>({ table: 'actions', key: 'id', options: { cache: false } }),

  /** Author */
  authorById: createLoader<AuthorModel>({ table: 'authors', key: 'id' }),

  /** Book */
  bookById: createLoader<BookModel>({ table: 'books', key: 'id' }),
  bookBySlug: createLoader<BookModel>({ table: 'books', key: 'slug' }),

  /** Topic */
  topicById: createLoader<TopicModel>({ table: 'topics', key: 'id' }),
  topicByName: createLoader<TopicModel>({ table: 'topics', key: 'name' }),

  /** User */
  userByEmail: createLoader<UserModel>({ table: 'users', key: 'email' }),
  userById: createLoader<UserModel>({ table: 'users', key: 'id' }),
  userByUsername: createLoader<UserModel>({ table: 'users', key: 'username' }),
}
