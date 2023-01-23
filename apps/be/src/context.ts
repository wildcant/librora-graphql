import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'
import { authorsDataSource, booksDataSource, usersDataSource } from './datasources'

export async function context(_args: StandaloneServerContextFunctionArgument) {
  return {
    dataSources: {
      books: booksDataSource,
      authors: authorsDataSource,
      users: usersDataSource,
    },
  }
}

export type IContext = Awaited<ReturnType<typeof context>>
