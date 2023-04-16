import { ActionModel, AuthorModel, BookModel, LocationModel, TopicModel, UserModel } from '@librora/schemas'
import DataLoader, { Options } from 'dataloader'
import { Knex } from 'knex'
import { mapTo } from '../utils'
import { ListKeys } from './types'

type LoadFnKey<T> = { value: string; select?: (keyof T)[] }
type CreateLoader<T, K, V> = { table: string; key: keyof T; options?: Options<K, V> }

type GetEntityPayload<T, S extends LoadFnKey<T>, U = keyof S> = 'select' extends U
  ? { [P in ListKeys<T, S['select']>]: P extends keyof T ? T[P] : never }
  : T

const createLoader = <
  T,
  K extends LoadFnKey<T> = LoadFnKey<T>,
  V extends GetEntityPayload<T, K> = GetEntityPayload<T, K>
>(
  knex: Knex,
  { table, key: keyName, options }: CreateLoader<T, K, V>
) =>
  new DataLoader<K, V>((keys) => {
    const keyValues = keys.map(({ value }) => value)
    const select = keys[0].select
    // Include key to selection in case it was not provided. We do this in order to map the results properly.
    if (select && !select.includes(keyName)) select.push(keyName)

    const selection = select ?? ['*']

    const records = knex(table)
      .whereIn(keyName as string, keyValues)
      .select(selection)
      .then((rows) => mapTo(rows, keyValues, (x) => x[keyName]))

    return records
  }, options)

/** Data Loaders. */
export const createLoaders = (knex: Knex) => ({
  /** Action. */
  actionById: createLoader<ActionModel>(knex, { table: 'actions', key: 'id' }),

  /** Author */
  authorById: createLoader<AuthorModel>(knex, { table: 'authors', key: 'id' }),

  /** Book */
  bookById: createLoader<BookModel>(knex, { table: 'books', key: 'id' }),
  bookBySlug: createLoader<BookModel>(knex, { table: 'books', key: 'slug' }),

  /** Topic */
  topicById: createLoader<TopicModel>(knex, { table: 'topics', key: 'id' }),
  topicByName: createLoader<TopicModel>(knex, { table: 'topics', key: 'name' }),

  /** User */
  userByEmail: createLoader<UserModel>(knex, { table: 'users', key: 'email' }),
  userById: createLoader<UserModel>(knex, { table: 'users', key: 'id' }),
  userByUsername: createLoader<UserModel>(knex, { table: 'users', key: 'username' }),

  /** Location */
  locationById: createLoader<LocationModel>(knex, { table: 'locations', key: 'id' }),
})

export type Loaders = ReturnType<typeof createLoaders>
