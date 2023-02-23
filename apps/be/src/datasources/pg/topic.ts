import { ApolloServerErrorCode } from '@apollo/server/errors'
import { TopicModel, TopicSchema } from '@librora/schemas'
import { GraphQLError } from 'graphql'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export type TopicDataSource = PgDataSource<TopicModel, Pick<TopicModel, 'id' | 'name'>>

export const topicsDataSource: TopicDataSource = {
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
    const ids = (await knex('topics').where(where).select('id')).map(({ id }) => id)
    return loaders.topicById.loadMany(ids.map((id) => ({ value: id, select })))
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
}
