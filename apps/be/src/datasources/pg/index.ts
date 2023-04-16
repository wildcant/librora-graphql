/* eslint-disable turbo/no-undeclared-env-vars */
import knexBuilder, { Knex } from 'knex'
import { env } from '../../env'
import { actionsDataSource } from './action'
import { authorsDataSource } from './author'
import { booksDataSource } from './book'
import { createLoaders } from './loaders'
import { topicsDataSource } from './topic'
import { usersDataSource } from './user'
import { locationsDataSource } from './location'

export const knexConfig = {
  client: 'postgres',
  connection: {
    host: env.DATABASE_HOST ?? '127.0.0.1',
    port: env.DATABASE_PORT ?? 5434,
    database: env.DATABASE_NAME ?? 'librora',
    user: env.DATABASE_USERNAME ?? 'postgres',
    password: env.DATABASE_PASSWORD ?? '12345',
    ssl: env.DATABASE_SSL ?? false,
  },
}

let knexInstance: Knex | undefined

if (!knexInstance) {
  knexInstance = knexBuilder({
    client: knexConfig.client,
    connection: {
      host: knexConfig.connection.host,
      port: knexConfig.connection.port,
      user: knexConfig.connection.user,
      password: knexConfig.connection.password,
      database: knexConfig.connection.database,
    },
    // debug: env.NODE_ENV === 'development',
  })
}

const loaders = createLoaders(knexInstance)

export const pgDataSources = {
  books: booksDataSource(knexInstance, loaders),
  authors: authorsDataSource(knexInstance, loaders),
  users: usersDataSource(knexInstance, loaders),
  actions: actionsDataSource(knexInstance, loaders),
  topics: topicsDataSource(knexInstance, loaders),
  locations: locationsDataSource(knexInstance, loaders),
  /** Loaders could be used to invalidate data loaders cache. */
  loaders,
}
