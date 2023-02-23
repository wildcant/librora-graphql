import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone'
import { actionsDataSource, authorsDataSource, booksDataSource, usersDataSource } from './datasources'
import { topicsDataSource } from './datasources/pg/topic'

export async function context(_args: StandaloneServerContextFunctionArgument) {
  return {
    dataSources: {
      books: booksDataSource,
      authors: authorsDataSource,
      users: usersDataSource,
      actions: actionsDataSource,
      topics: topicsDataSource,
    },
  }
}

export type Context = Awaited<ReturnType<typeof context>>
