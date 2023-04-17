import { ApolloServerErrorCode } from '@apollo/server/errors'
import bcrypt from 'bcrypt'
import { validateResetPasswordAction } from 'core/action'
import addHours from 'date-fns/addHours'
import { env } from 'env'
import { getFieldsFor } from 'graph/graphql-to-sql'
import { GraphQLError } from 'graphql'
import { SignJWT, decodeJwt } from 'jose'
import omit from 'lodash/fp/omit'
import { ActionModel, EActionNamespace, EUserActionName, UserModel } from 'schemas'
import { sendPasswordInstructions } from 'side-effects/comms/email'
import { OptionalId } from 'types'
import z from 'zod'
import { AuthModule } from './types'

/** Sign in mutation. */
const signIn: AuthModule.MutationResolvers['signIn'] = async (_, args, context, info) => {
  const { account, password } = args.input

  // Check if account is the username or the email.
  const login: 'email' | 'username' = z.string().email().safeParse(account).success ? 'email' : 'username'

  const userProjection = getFieldsFor<UserModel>(info, 'user', 'User') ?? []
  userProjection.push('password')

  const rawUser = await context.dataSources.pg.users.findUnique({
    where: account === 'email' ? { email: account } : { username: account },
    select: userProjection,
  })

  const passwordMatched = await bcrypt.compare(password, rawUser?.password ?? '')

  if (!rawUser || !passwordMatched) {
    return { success: false, message: `Invalid ${login} or password.` }
  }

  const user = omit(['password'], rawUser)
  const secret = new TextEncoder().encode(env.JWT_SECRET)
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(env.JWT_EXPIRATION)
    .sign(secret)
  const expires = decodeJwt(token).exp as number

  return { success: true, message: 'Logged in.', user, token, expires }
}

/** Forgot Password mutation. */
const forgotPassword: AuthModule.MutationResolvers['forgotPassword'] = async (_, args, context) => {
  const { email } = args.input

  const user = await context.dataSources.pg.users.findUnique({
    where: { email },
    select: ['id', 'username', 'firstName'],
  })

  if (user) {
    const resetPasswordAction: OptionalId<ActionModel> = {
      namespace: EActionNamespace.UserFlow,
      name: EUserActionName.ResetPassword,
      user: user.id,
      metadata: { expiresAt: addHours(new Date(), 3), redeemed: false },
    }

    context.dataSources.pg.actions.create(resetPasswordAction).then((action) => {
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

/** Reset Password mutation.*/
const resetPassword: AuthModule.MutationResolvers['resetPassword'] = async (_, args, context) => {
  const { token, newPassword } = args.input

  // Validate reset password action.
  const action = await context.dataSources.pg.actions.findUnique({ where: { id: token } })

  if (!action || action.name !== EUserActionName.ResetPassword) {
    return { success: false, message: 'Action not found.' }
  }

  if (!validateResetPasswordAction(action.metadata).valid) {
    return { success: false, message: 'Action not valid.' }
  }

  // Update user password.
  const updatedUser = await context.dataSources.pg.users.update({
    where: { id: action.user },
    data: { password: newPassword },
  })

  if (!updatedUser)
    throw new GraphQLError('It was not able to update the user.', {
      extensions: {
        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
      },
    })

  await context.dataSources.pg.actions.update({
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
