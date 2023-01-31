import { BookModel, BookSchema } from '@librora/schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IBookDataSource extends PgDataSource<BookModel> {}

export const booksDataSource: IBookDataSource = {
  findUnique: async (query) => loaders.bookById.load(query.where.id),

  findMany: async (ids) => loaders.bookById.loadMany(ids),

  create: async (data) => {
    BookSchema.partial({ id: true }).parse(data)
    const [record] = await knex('books').insert(data).select('*')
    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('books').where(where).update(data).returning('*')
    return record
  },
}
