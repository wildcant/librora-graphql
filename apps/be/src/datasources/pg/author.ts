import { AuthorModel, AuthorSchema } from 'schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IAuthorDataSource extends PgDataSource<AuthorModel> {}

export const authorsDataSource: IAuthorDataSource = {
  findUnique: (id) => loaders.authorById.load(id),

  findMany: (ids) => loaders.authorById.loadMany(ids),

  create: async (data) => {
    AuthorSchema.parse(data)
    const [author] = await knex('authors').insert(data).select('*')
    return author
  },
}
