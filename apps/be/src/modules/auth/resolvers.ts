import z from 'zod'
import { context } from '../../context'
import { AuthModule } from './types'

export const resolvers: AuthModule.Resolvers = {
  Mutation: {
    signIn: async (_, args, context) => {
      const { account, password } = args.input

      // Check if account is the username or the email.
      const login: 'email' | 'username' = z.string().email().safeParse(account).success ? 'email' : 'username'

      const user =
        login === 'email'
          ? await context.dataSources.users.findUnique({ where: { email: account } })
          : await context.dataSources.users.findUnique({ where: { username: account } })

      // TODO: Encrypt password, improve security and update validation.
      if (!user || password !== user?.password) {
        return { success: false, message: `Invalid ${login} or password.` }
      }

      return { success: true, message: 'Logged in.', user }
    },

    resetPassword: async (_, args, context) => {
      const { email } = args.input

      // TODO: Implement sendgrind integration.
      return {
        success: true,
        message:
          'If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.',
      }
    },
  },
}
