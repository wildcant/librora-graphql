import addHours from 'date-fns/addHours'
import isAfter from 'date-fns/isAfter'
import { ActionModel, EActionNamespace, EUserActionName, EUserRole, EUserType } from '@librora/schemas'
import { sendVerificationEmail, validateResetPasswordAction } from '../action/utils'
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
      const user = await context.dataSources.users.create({
        ...args.input,
        type: EUserType.User,
        role: EUserRole.LenderBorrower,
      })

      if (!user) return { success: false, message: 'There was a problem creating your account.', user: null }

      sendVerificationEmail({ userId: user.id, context })

      return { user, success: true, message: 'User was created successfully.' }
    },

    verifyEmail: async (_, args, context) => {
      const { token } = args.input
      // Validate reset password action.
      const action = await context.dataSources.actions.findUnique({ where: { id: token } })

      if (!action || action.name !== EUserActionName.EmailConfirmation) {
        return { success: false, message: 'Action not found.' }
      }

      if (action.metadata.redeemed) {
        return { success: true, message: 'Email was already verified' }
      }

      if (isAfter(new Date(), new Date(action.metadata.expiresAt))) {
        return { success: false, message: 'Action expired' }
      }

      await context.dataSources.actions.update({
        where: { id: token },
        data: { metadata: { redeemed: true, expiresAt: action.metadata.expiresAt } },
      })

      return { success: true, message: 'Email verified' }
    },
  },

  User: {
    id: (u) => u.id!,
    initial: (u) => u.firstName.charAt(0),
  },
}
