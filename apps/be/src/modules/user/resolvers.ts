import { UserModule } from './types'

export const resolvers: UserModule.Resolvers = {
  Query: {
    user: async (_, args, context) => {
      const user = await context.dataSources.users.findUnique(args.id)

      if (!user) {
        return null
      }

      return user
    },
  },

  User: {
    id: (u) => u.id,
    initial: (u) => u.firstName.charAt(0),
  },
}
