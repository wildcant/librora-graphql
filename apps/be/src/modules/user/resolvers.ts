// import { UserModel } from '../../datasources'
import { EUserRole, EUserType, UserModel } from 'schemas'
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

  Mutation: {
    createUser: async (_, args, context) => {
      const data: UserModel = {
        ...args.input,
        type: EUserType.User,
        role: EUserRole.LenderBorrower,
      }
      const user = await context.dataSources.users.create(data)
      if (!user) return null
      return { user }
    },
  },

  User: {
    id: (u) => u.id!,
    initial: (u) => u.firstName.charAt(0),
  },
}
