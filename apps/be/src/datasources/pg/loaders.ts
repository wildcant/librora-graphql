import { ActionModel, AuthorModel, BookModel, TopicModel, UserModel } from '@librora/schemas'
import DataLoader, { Options } from 'dataloader'
import { Knex } from 'knex'
import { mapTo } from '../utils'

type LoadFnKey<T> = { value: string; select?: (keyof T)[] }
type CreateLoader<T> = { table: string; key: keyof T; options?: Options<LoadFnKey<T>, T> }

const createLoader = <T>(knex: Knex, { table, key: keyName, options }: CreateLoader<T>) =>
  new DataLoader<LoadFnKey<T>, T | null>(
    (keys) => {
      const keyValues = keys.map(({ value }) => value)
      const select = keys[0].select
      // Include key to selection in case it was not provided. We do this in order to map the results properly.
      if (select && !select.includes(keyName)) select.push(keyName)
      const selection = select ?? ['*']

      return knex(table)
        .whereIn(keyName as string, keyValues)
        .select(selection)
        .then((rows) => mapTo(rows, keyValues, (x) => x[keyName]))
    },
    // Disable cache by default.
    { ...options, ...(typeof options?.cache === 'undefined' ? { cache: false } : { cache: options?.cache }) }
  )

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
})

export type Loaders = ReturnType<typeof createLoaders>
