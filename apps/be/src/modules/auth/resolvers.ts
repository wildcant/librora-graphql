import { ActionModel, EActionNamespace, EUserActionName } from '@librora/schemas'
import addHours from 'date-fns/addHours'
import omit from 'lodash/fp/omit'
import z from 'zod'
import { sendPasswordInstructions } from '../../comms/email'
import { MutationResolvers } from '../../graphql/types'
import { validateResetPasswordAction } from '../action/utils'
import { AuthModule } from './types'

/**
 * Sign in mutation.
 */
const signIn: MutationResolvers['signIn'] = async (_, args, context) => {
  const { account, password } = args.input

  // Check if account is the username or the email.
  const login: 'email' | 'username' = z.string().email().safeParse(account).success ? 'email' : 'username'

  const rawUser = await context.dataSources.users.findUnique({
    where: account === 'email' ? { email: account } : { username: account },
  })

  // TODO: Encrypt password to improve security and update validation.
  if (!rawUser || password !== rawUser?.password) {
    return { success: false, message: `Invalid ${login} or password.` }
  }

  return { success: true, message: 'Logged in.', user: omit(['password'], rawUser) }
}

/**
 * Forgot Password mutation.
 */
const forgotPassword: MutationResolvers['forgotPassword'] = async (_, args, context) => {
  const { email } = args.input

  const user = await context.dataSources.users.findUnique({ where: { email }, select: ['id', 'username'] })

  if (user) {
    const resetPasswordAction: ActionModel = {
      namespace: EActionNamespace.UserFlow,
      name: EUserActionName.ResetPassword,
      user: user.id,
      metadata: { expiresAt: addHours(new Date(), 3), redeemed: false },
    }

    context.dataSources.actions.create(resetPasswordAction).then((action) => {
      if (!action || !action.id) {
        console.warn('It was not able to create the reset password action.')
        return
      }

      sendPasswordInstructions(email, { token: action.id, userFirstName: user.firstName })
    })
  }

  return {
    success: true,
    message:
      'If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.',
  }
}

/**
 * Reset Password mutation.
 */
const resetPassword: MutationResolvers['resetPassword'] = async (_, args, context) => {
  const { token, newPassword } = args.input

  // Validate reset password action.
  const action = await context.dataSources.actions.findUnique({ where: { id: token } })

  if (!action || action.name !== EUserActionName.ResetPassword) {
    return { success: false, message: 'Action not found.' }
  }

  if (!validateResetPasswordAction(action.metadata).valid) {
    return { success: false, message: 'Action not valid.' }
  }

  // Update user password.
  const updatedUser = await context.dataSources.users.update({
    where: { id: action.user },
    data: { password: newPassword },
  })

  await context.dataSources.actions.update({
    where: { id: token },
    data: { metadata: { redeemed: true, expiresAt: action.metadata.expiresAt } },
  })

  return { success: true, message: 'Password updated', user: updatedUser }
}

export const resolvers: AuthModule.Resolvers = {
  Mutation: {
    signIn,
    forgotPassword,
    resetPassword,
  },
}
