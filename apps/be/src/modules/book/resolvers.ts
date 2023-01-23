import { BookModule } from './types'

export const resolvers: BookModule.Resolvers = {
  Query: {
    book: async (_, args, context) => {
      const book = await context.dataSources.books.findUnique(args.id)

      if (!book) {
        return null
      }

      return book
    },
  },

  Book: {
    id: (b) => b.id,
    author: async (b, _, c) => c.dataSources.authors.findUnique(b.author),
    user: async (b, _, c) => c.dataSources.users.findUnique(b.user),
  },
}
