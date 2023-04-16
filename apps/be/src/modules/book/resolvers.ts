import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'
// import z from 'zod'
import { CustomErrorCode, getFields } from '../../core'
import { createTypeConnection, DEFAULT_PAGE_SIZE } from '../../graphql/pagination'
import { BookModule } from './types'

const searchBooks: BookModule.QueryResolvers['searchBooks'] = async (_, args, context, info) => {
  // TODO: Add sorting.
  const { filters, pagination } = args.input

  // Validate free text is not empty.
  // z.string().min(1, { message: `Field "freeText" must not be empty.` }).parse(filters.freeText)

  const limit = pagination.limit ?? DEFAULT_PAGE_SIZE
  const offset = pagination.offset ?? 0

  const { count, nodes } = await context.dataSources.books.search({
    limit,
    offset,
    select: getFields(info),
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

  const book = await context.dataSources.books.findUnique({
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
      await context.dataSources.authors.findUnique({ where: { id: book.author }, select: getFields(info) }),

    user: async (book, _args, context, info) => {
      const user = await context.dataSources.users.findUnique({
        where: { id: book.user },
        select: getFields(info),
      })

      if (!user)
        throw new GraphQLError(`The user for this book doesn't exist.`, {
          extensions: {
            code: CustomErrorCode.DATA_INCONSISTENCY,
            message: `User not found for book with ${book.id}`,
          },
        })

      return user
    },
  },
}
