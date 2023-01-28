import { AuthorModule } from './types'

export const resolvers: AuthorModule.Resolvers = {
  Query: {
    author: (_, args, context) => context.dataSources.authors.findUnique({ where: { id: args.id } }),
  },
  Author: {
    id: ({ id }) => id,
    name: ({ name }) => name,
  },
}
