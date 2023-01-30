import { AuthorModel, AuthorSchema } from 'schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IAuthorDataSource extends PgDataSource<AuthorModel> {}

export const authorsDataSource: IAuthorDataSource = {
  findUnique: (query) => loaders.authorById.load(query.where.id),

  findMany: (ids) => loaders.authorById.loadMany(ids),

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
