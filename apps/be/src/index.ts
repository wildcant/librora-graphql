import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import { context, IContext } from './context'
import { readFileSync } from 'fs'
import path from 'path'

const resolversArray = loadFilesSync(path.join(`${__dirname}/modules/**/resolvers.*`))

const server = new ApolloServer<IContext>({
  typeDefs: readFileSync('schema.graphql', { encoding: 'utf-8' }),
  resolvers: mergeResolvers(resolversArray),
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`))
