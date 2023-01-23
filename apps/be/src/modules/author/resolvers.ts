import { AuthorModule } from './types'

export const resolvers: AuthorModule.Resolvers = {
  Query: {
    author: (_, args, context) => context.dataSources.authors.findUnique(args.id),
  },
  Author: {
    id: ({ id }) => id,
    name: ({ name }) => name,
  },
}
