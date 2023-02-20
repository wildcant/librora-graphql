import { TopicModel } from '@librora/schemas'
import { getFields } from '../../core'
import { TopicModule } from './types'

export const resolvers: TopicModule.Resolvers = {
  Query: {
    topics: async (_, __, context, info) => {
      const topics = await context.dataSources.topics.findMany({
        select: getFields(info),
      })

      return topics as TopicModel[]
    },
  },
}
