import { getFields } from 'graph/graphql-to-sql'
import { AuthorModule } from './types'
import { AuthorModel } from '@librora/schemas'

export const resolvers: AuthorModule.Resolvers = {
  Query: {
    author: (_, args, context, info) =>
      context.dataSources.pg.authors.findUnique({
        where: { id: args.id },
        select: getFields<AuthorModel>(info),
      }),
  },
  Author: {
    id: (author) => author.id,
    name: (author) => author.name,
  },
}
