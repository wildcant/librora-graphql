import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone'
import { actionsDataSource, authorsDataSource, booksDataSource, usersDataSource } from './datasources'

export async function context(_args: StandaloneServerContextFunctionArgument) {
  return {
    dataSources: {
      books: booksDataSource,
      authors: authorsDataSource,
      users: usersDataSource,
      actions: actionsDataSource,
    },
  }
}

export type IContext = Awaited<ReturnType<typeof context>>
