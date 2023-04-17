import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
import { Knex } from 'knex'
import { AuthorModel, AuthorSchema } from 'schemas'
import { Loaders } from './loaders'
import { PgDataSource } from './types'

export type AuthorDataSource = PgDataSource<AuthorModel>

export const authorsDataSource = (knex: Knex, loaders: Loaders): AuthorDataSource => ({
  findUnique: async ({ where, select }) => {
    if (where.id) return await loaders.authorById.load({ value: where.id, select })

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  },

  findMany: async ({ where = {}, select }) => {
    const authors = await knex('authors')
      .where(where)
      .select(select ?? '*')
    return authors
  },

  create: async (data) => {
    AuthorSchema.partial({ id: true }).parse(data)
    const [record] = await knex('authors').insert(data).select('*')
    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('authors').where(where).update(data).returning('*')
    return record
  },
})
