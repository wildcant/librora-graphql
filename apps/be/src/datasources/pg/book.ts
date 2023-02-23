import { ApolloServerErrorCode } from '@apollo/server/errors'
import { BookModel, BookSchemaValidators } from '@librora/schemas'
import { GraphQLError } from 'graphql'
import { z } from 'zod'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export type BookDataSource = PgDataSource<BookModel, Pick<BookModel, 'id' | 'slug'>> & {
  search: (query: {
    limit: number
    offset: number
    select?: (keyof BookModel)[]
    where: { freeText: string }
  }) => Promise<{ count: number; nodes: BookModel[] }>
}

export const booksDataSource: BookDataSource = {
  findUnique: async ({ where, select }) => {
    const { id, slug } = where

    if (id) {
      z.string().uuid().parse(id)
      return loaders.bookById.load({ value: id, select })
    }

    if (slug) return loaders.bookBySlug.load({ value: slug, select })

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
  },

  findMany: async ({ where = {}, select }) => {
    const ids = await knex('books').where(where).select('id')

    return loaders.bookById.loadMany(ids.map(({ id }) => ({ value: id, select })))
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

  search: async ({ where: { freeText = '' }, select, limit, offset }) => {
    // TODO: Improve query to allow filtering by author and publication date.
    const query = freeText ? `fullText @@ to_tsquery('${freeText.replace(' ', ':* & ')}:*')` : ''

    const [ids, [{ count }]] = await Promise.all([
      knex('books')
        .limit(limit)
        .offset(offset)
        .orderByRaw(`ts_rank(fullText, plainto_tsquery('${freeText.replace(' ', ' & ')}:*')) DESC`)
        .whereRaw(query)
        // .select(knex.raw(`ts_rank(fullText, plainto_tsquery('${text}'))`)) // For testing purposes.
        .select('id'),
      knex('books').whereRaw(query).count(),
    ])

    // TODO: Double check error handling.
    const nodes = (await loaders.bookById.loadMany(
      ids.map(({ id }) => ({ value: id, select }))
    )) as BookModel[]

    return { count, nodes }
  },
}
