import { getFields } from '../../utils'
import { AuthorModule } from './types'

export const resolvers: AuthorModule.Resolvers = {
  Query: {
    author: (_, args, context, info) =>
      context.dataSources.authors.findUnique({ where: { id: args.id }, select: getFields(info) }),
  },
  Author: {
    id: (author) => author.id,
    name: (author) => author.name,
  },
}
