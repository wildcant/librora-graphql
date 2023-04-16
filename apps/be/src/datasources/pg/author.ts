import { AuthorModel, AuthorSchema } from '@librora/schemas'
import { Knex } from 'knex'
import { Loaders } from './loaders'
import { PgDataSource } from './types'
import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/dist/esm/errors'

export type AuthorDataSource = PgDataSource<AuthorModel>

export const authorsDataSource = (knex: Knex, loaders: Loaders): AuthorDataSource => ({
  findUnique: async ({ where, select }) => {
    if (where.id) {
      const author = await loaders.authorById.load({ value: where.id, select })
      return author
    }

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
