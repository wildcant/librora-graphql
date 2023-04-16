import { ActionModel } from '@librora/schemas'
import { Knex } from 'knex'
import { Loaders } from './loaders'
import { PgDataSource } from './types'
import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/dist/esm/errors'

export type ActionDataSource = PgDataSource<ActionModel>

export const actionsDataSource = (knex: Knex, loaders: Loaders): ActionDataSource => ({
  findUnique: async ({ where, select }) => {
    if (where.id) {
      const action = await loaders.actionById.load({ value: where.id, select })
      return action as ReturnType<ActionDataSource['findUnique']>
    }

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  },

  findMany: async ({ where = {}, select }) => {
    const actions = (await knex('actions')
      .where(where)
      .select(select ?? '*')) as ReturnType<ActionDataSource['findMany']>
    return actions
  },

  create: async (data) => {
    const [record] = await knex('actions')
      .insert(data as ActionModel)
      .returning('*')

    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('actions').where(where).update(data).returning('*')
    return record
  },
})
