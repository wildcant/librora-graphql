import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import SendGrid from '@sendgrid/mail'
import { readFileSync } from 'fs'
import path from 'path'
import { context, IContext } from './context'
import { env } from './env'

SendGrid.setApiKey(env.SENDGRID_API_KEY)

const resolversArray = loadFilesSync(path.join(`${__dirname}/modules/**/resolvers.*`))
const server = new ApolloServer<IContext>({
  typeDefs: readFileSync('schema.graphql', { encoding: 'utf-8' }),
  resolvers: mergeResolvers(resolversArray),
})

startStandaloneServer(server, {
  listen: { port: env.PORT ?? 4000 },
  context,
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`))
