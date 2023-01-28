import { BookModule } from './types'

export const resolvers: BookModule.Resolvers = {
  Query: {
    book: async (_, args, context) => {
      const book = await context.dataSources.books.findUnique({ where: { id: args.id } })

      if (!book) {
        return null
      }

      return book
    },
  },

  Book: {
    id: (b) => b.id,
    author: async (b, _, c) =>
      b.author ? c.dataSources.authors.findUnique({ where: { id: b.author } }) : null,
    user: async (b, _, c) => c.dataSources.users.findUnique({ where: { id: b.user } }),
  },
}
