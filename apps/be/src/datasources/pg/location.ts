import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
import { Knex } from 'knex'
import { LocationModel, LocationSchema } from 'schemas'
import { Loaders } from './loaders'
import { PgDataSource } from './types'

export type LocationDataSource = PgDataSource<LocationModel>

export const locationsDataSource = (knex: Knex, loaders: Loaders): LocationDataSource => ({
  findUnique: async ({ where, select }) => {
    if (where.id) return await loaders.locationById.load({ value: where.id, select })

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  },
  findMany: async ({ where = {}, select }) => {
    const records = await knex('locations')
      .where(where)
      .select(select ?? '*')
    return records
  },

  create: async (data) => {
    LocationSchema.partial({ id: true }).parse(data)
    const [record] = await knex('locations').insert(data).select('*')
    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('locations').where(where).update(data).returning('*')
    return record
  },
})
