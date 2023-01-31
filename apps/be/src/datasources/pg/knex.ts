/* eslint-disable turbo/no-undeclared-env-vars */
import knexBuilder, { Knex } from 'knex'
import { env } from '../../env'

const config = {
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
    client: config.client,
    connection: {
      host: config.connection.host,
      port: config.connection.port,
      user: config.connection.user,
      password: config.connection.password,
      database: config.connection.database,
    },
    debug: true,
  })
}

export const knex = knexInstance
