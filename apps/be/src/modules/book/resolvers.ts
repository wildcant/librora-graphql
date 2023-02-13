import { BookModel } from '@librora/schemas'
import z from 'zod'
import { getFields } from '../../utils'
import { BookModule } from './types'

export const resolvers: BookModule.Resolvers = {
  Query: {
    searchBooks: async (_, args, context, info) => {
      if (!z.string().min(1).safeParse(args.text).success) return []

      const records = await context.dataSources.books.search({
        where: { fullText: args.text },
        select: getFields(info),
      })

      return records as BookModel[]
    },

    book: async (_, args, context, info) => {
      const book = await context.dataSources.books.findUnique({
        where: { id: args.id },
        select: getFields(info),
      })

      if (!book) {
        return null
      }

      return book
    },

    books: async (_, __, context, info) => {
      const records = await context.dataSources.books.findMany({ select: getFields(info) })

      return records as BookModel[]
    },
  },

  Book: {
    author: async (book, __, context, info) =>
      context.dataSources.authors.findUnique({ where: { id: book.author }, select: getFields(info) }),

    user: async (book, __, context, info) =>
      context.dataSources.users.findUnique({ where: { id: book.user }, select: getFields(info) }),
  },
}
