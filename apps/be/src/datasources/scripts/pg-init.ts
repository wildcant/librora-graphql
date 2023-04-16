#!/usr/bin/env tsx

import knexBuilder from 'knex'
import { knexConfig } from '../pg'
import { seed } from './pg-queries'
import { createTables } from './pg-tables'

const knex = knexBuilder({
  client: knexConfig.client,
  connection: {
    host: knexConfig.connection.host,
    port: knexConfig.connection.port,
    user: knexConfig.connection.user,
    password: knexConfig.connection.password,
    database: knexConfig.connection.database,
  },
  debug: true,
})

createTables(knex)
  .then(() => seed(knex, ['insert']))
  .catch(console.error)
