import { ApolloServerErrorCode } from '@apollo/server/errors'
import { getFields } from 'graph/graphql-to-sql'
import { createTypeConnection, DEFAULT_PAGE_SIZE } from 'graph/pagination'
import { GraphQLError } from 'graphql'
import { CustomErrorCode } from 'side-effects/handle-errors'
import { BookModule } from './types'
import { BookModel } from 'schemas'

const searchBooks: BookModule.QueryResolvers['searchBooks'] = async (_, args, context, info) => {
  // TODO: Add sorting.
  const { filters, pagination } = args.input

  // Validate free text is not empty.
  // z.string().min(1, { message: `Field "freeText" must not be empty.` }).parse(filters.freeText)

  const limit = pagination.limit ?? DEFAULT_PAGE_SIZE
  const offset = pagination.offset ?? 0

  const { count, nodes } = await context.dataSources.pg.books.search({
    limit,
    offset,
    select: getFields<BookModel>(info),
    where: { freeText: filters.freeText },
  })

  return createTypeConnection({ nodes, count, limit, offset })
}

const bookResolver: BookModule.QueryResolvers['book'] = async (_, args, context, info) => {
  if (!args.id && !args.slug) {
    throw new GraphQLError('Please provide an id or a slug.', {
      extensions: {
        code: ApolloServerErrorCode.BAD_USER_INPUT,
      },
    })
  }

  const book = await context.dataSources.pg.books.findUnique({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    where: { id: args.id!, slug: args.slug! },
    select: getFields(info),
  })

  return book
}

export const resolvers: BookModule.Resolvers = {
  Query: {
    searchBooks,
    book: bookResolver,
  },

  Book: {
    author: async (book, _args, context, info) =>
      await context.dataSources.pg.authors.findUnique({
        where: { id: book.author },
        select: getFields(info),
      }),

    owner: async (book, _args, context, info) => {
      const user = await context.dataSources.pg.users.findUnique({
        where: { id: book.owner },
        select: getFields(info),
      })

      if (!user)
        throw new GraphQLError(`The owner of this book doesn't exist.`, {
          extensions: {
            code: CustomErrorCode.DATA_INCONSISTENCY,
            message: `User not found for book with ${book.id}`,
          },
        })

      return user
    },
  },
}
