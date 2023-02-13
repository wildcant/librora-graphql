import { BookModel, BookSchema } from '@librora/schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IBookDataSource extends PgDataSource<BookModel> {
  search: (query: {
    where: { fullText: string }
    select?: (keyof BookModel)[]
  }) => Promise<(BookModel | Error | null)[]>
}

export const booksDataSource: IBookDataSource = {
  findUnique: async ({ where, select }) => loaders.bookById.load({ value: where.id, select }),

  findMany: async ({ where = {}, select }) => {
    const ids = await knex('books').where(where).select('id')

    return loaders.bookById.loadMany(ids.map(({ id }) => ({ value: id, select })))
  },

  create: async (data) => {
    BookSchema.partial({ id: true }).parse(data)
    const [record] = await knex('books').insert(data).select('*')
    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('books').where(where).update(data).returning('*')
    return record
  },

  search: async ({ where: { fullText = '' }, select }) => {
    const ids = await knex('books')
      .whereRaw(`fullText @@ to_tsquery('${fullText.replace(' ', ':* & ')}:*')`)
      .orderByRaw(`ts_rank(fullText, plainto_tsquery('${fullText.replace(' ', ' & ')}:*')) DESC;`)
      .select('id')
    // .select(knex.raw(`ts_rank(fullText, plainto_tsquery('${text}'))`)) // For testing purposes.

    return loaders.bookById.loadMany(ids.map(({ id }) => ({ value: id, select })))
  },
}
