import { EUserRole, EUserType, UserModel } from 'schemas'
import { UserModule } from './types'

export const resolvers: UserModule.Resolvers = {
  Query: {
    user: async (_, args, context) => {
      const user = await context.dataSources.users.findUnique({ where: { id: args.id } })

      if (!user) {
        return null
      }

      return user
    },
  },

  Mutation: {
    createUser: async (_, args, context) => {
      const data: UserModel = {
        ...args.input,
        type: EUserType.User,
        role: EUserRole.LenderBorrower,
      }
      const user = await context.dataSources.users.create(data)
      // await new Promise((res) => setTimeout(() => res('ok'), 1000)) // simulate slow response.

      if (!user) return null
      return { user, success: true, message: 'User was created successfully.' }
    },
  },

  User: {
    id: (u) => u.id!,
    initial: (u) => u.firstName.charAt(0),
  },
}
