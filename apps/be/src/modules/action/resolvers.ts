import { EUserActionName } from '@librora/schemas'
import z from 'zod'
import { ActionModule } from './types'
import { sendVerificationEmail, validateResetPasswordAction } from './utils'

const validateAction: ActionModule.MutationResolvers['validateAction'] = async (_, args, context) => {
  if (!z.string().uuid().safeParse(args.id).success) return { valid: false, message: 'Invalid Action id.' }

  const action = await context.dataSources.pg.actions.findUnique({ where: { id: args.id } })

  if (!action) return { valid: false, message: 'Action not found' }

  if (action.name === EUserActionName.ResetPassword) return validateResetPasswordAction(action.metadata)

  return { valid: false, message: 'Unknown action' }
}

const resendVerificationEmail: ActionModule.MutationResolvers['resendVerificationEmail'] = async (
  _,
  args,
  context
) => {
  const action = await context.dataSources.pg.actions.findUnique({ where: { id: args.token } })

  if (!action || action.name !== EUserActionName.EmailConfirmation)
    return {
      success: false,
      message: 'It was not possible to send you a new verification email. Please contact support.',
    }

  sendVerificationEmail({ userId: action.user, context })

  return { success: true, message: 'Verification email sent' }
}

export const resolvers: ActionModule.Resolvers = {
  Mutation: {
    validateAction,
    resendVerificationEmail,
  },
}
