import { TopicModel } from 'schemas'
import { getFields } from 'graph/graphql-to-sql'
import { TopicModule } from './types'

const topicsResolver: TopicModule.QueryResolvers['topics'] = async (_, __, context, info) => {
  const topics = await context.dataSources.pg.topics.findMany({
    select: getFields<TopicModel>(info),
  })

  return topics as TopicModel[]
}

export const resolvers: TopicModule.Resolvers = {
  Query: {
    topics: topicsResolver,
  },
}
