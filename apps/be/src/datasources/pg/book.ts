import { BookModel, BookSchema } from 'schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IBookDataSource extends PgDataSource<BookModel> {}

export const booksDataSource: IBookDataSource = {
  findUnique: async (query) => loaders.bookById.load(query.where.id),

  findMany: async (ids) => loaders.bookById.loadMany(ids),

  create: async (data) => {
    BookSchema.parse(data)
    const [book] = await knex('books').insert(data).select('*')
    return book
  },
}
