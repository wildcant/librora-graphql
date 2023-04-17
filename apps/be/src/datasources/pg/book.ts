import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
import { Knex } from 'knex'
import { z } from 'zod'
import { Prettify } from 'types'
import { Loaders } from './loaders'
import { FindManyArgs, PgDataSource } from './types'
import { BookModel, BookSchemaValidators } from 'schemas'

export type BookDataSource = PgDataSource<BookModel, Pick<BookModel, 'id' | 'slug'>> & {
  search: (
    query: Prettify<Omit<FindManyArgs<BookModel>, 'where'> & { where: { freeText?: string } }>
  ) => Promise<{ count: number; nodes: BookModel[] }>
}

export const booksDataSource = (knex: Knex, loaders: Loaders): BookDataSource => ({
  findUnique: async ({ where, select }) => {
    const { id, slug } = where

    if (id) {
      z.string().uuid().parse(id)
      const book = await loaders.bookById.load({ value: id, select })
      return book
    }

    if (slug) return loaders.bookBySlug.load({ value: slug, select })

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  },

  findMany: async ({ where = {}, select }) => {
    const books = knex('books')
      .where(where)
      .select(select ?? '*')
    return books
  },

  create: async (data) => {
    BookSchemaValidators.default.parse(data)
    const [record] = await knex('books').insert(data).returning('*')
    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('books').where(where).update(data).returning('*')
    return record
  },

  search: async ({ where: { freeText = '' }, select, limit = 10, offset = 0 }) => {
    // TODO: Improve query to allow filtering by author and publication date.
    const query = freeText ? `fullText @@ to_tsquery('${freeText.replace(' ', ':* & ')}:*')` : ''

    const [nodes, [countDict]] = await Promise.all([
      knex('books')
        .limit(limit)
        .offset(offset)
        .orderByRaw(`ts_rank(fullText, plainto_tsquery('${freeText.replace(' ', ' & ')}:*')) DESC`)
        .whereRaw(query)
        // .select(knex.raw(`ts_rank(fullText, plainto_tsquery('${text}'))`)) // For testing purposes.
        .select(select ?? '*'),
      knex('books').whereRaw(query).count(),
    ])

    return { count: (countDict as { count: number }).count, nodes }
  },
})
