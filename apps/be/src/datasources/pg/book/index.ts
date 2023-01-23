import { PgDataSource } from '../types'
import { loaders } from '../loaders'
import { BookModel } from './model'

export * from './model'

export interface IBookDataSource extends PgDataSource<BookModel> {}

export const booksDataSource: IBookDataSource = {
  findUnique: async (id) => loaders.bookById.load(id),
  findMany: async (ids) => loaders.bookById.loadMany(ids),
}
