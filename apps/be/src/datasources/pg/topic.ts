import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
import { Knex } from 'knex'
import { TopicModel, TopicSchema } from 'schemas'
import { Loaders } from './loaders'
import { PgDataSource } from './types'

export type TopicDataSource = PgDataSource<TopicModel, Pick<TopicModel, 'id' | 'name'>>

export const topicsDataSource = (knex: Knex, loaders: Loaders): TopicDataSource => ({
  findUnique: async ({ where, select }) => {
    const { id, name } = where

    if (id) {
      return loaders.topicById.load({ value: id, select })
    }

    if (name) {
      return loaders.topicByName.load({ value: name, select })
    }

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  },

  findMany: async ({ where = {}, select }) => {
    const records = await knex('topics')
      .where(where)
      .select(select ?? '*')
    return records
  },

  create: async (data) => {
    TopicSchema.partial({ id: true }).parse(data)
    const [record] = await knex('topics').insert(data).returning('*')
    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('topics').where(where).update(data).returning('*')
    return record
  },
})
