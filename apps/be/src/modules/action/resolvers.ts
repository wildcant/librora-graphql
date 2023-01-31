import { EUserActionName } from '@librora/schemas'
import z from 'zod'
import { ActionModule } from './types'
import { sendVerificationEmail, validateResetPasswordAction } from './utils'

export const resolvers: ActionModule.Resolvers = {
  Mutation: {
    validateAction: async (_, args, context) => {
      if (!z.string().uuid().safeParse(args.id).success) {
        return { valid: false, message: 'Invalid Action id.' }
      }

      const action = await context.dataSources.actions.findUnique({ where: { id: args.id } })

      if (!action) {
        return { valid: false, message: 'Action not found' }
      }

      switch (action.name) {
        case EUserActionName.ResetPassword:
          return validateResetPasswordAction(action.metadata)

        default:
          return { valid: false, message: 'Unknown action' }
      }
    },

    resendVerificationEmail: async (_, args, context) => {
      const action = await context.dataSources.actions.findUnique({ where: { id: args.token } })

      if (!action || action.name !== EUserActionName.EmailConfirmation) {
        return {
          success: false,
          message: 'It was not possible to send you a new verification email. Please contact support.',
        }
      }

      sendVerificationEmail({ userId: action.userId, context })

      return { success: true, message: 'Verification email sent' }
    },
  },
}
