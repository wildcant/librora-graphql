import { AuthorModel, AuthorSchema } from '@librora/schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export type AuthorDataSource = PgDataSource<AuthorModel>

export const authorsDataSource: AuthorDataSource = {
  findUnique: ({ where, select }) => loaders.authorById.load({ value: where.id, select: select }),

  findMany: async ({ where = {}, select }) => {
    const ids = (await knex('authors').where(where).select('id')).map(({ id }) => id)
    return loaders.authorById.loadMany(ids.map((id) => ({ value: id, select })))
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
}
