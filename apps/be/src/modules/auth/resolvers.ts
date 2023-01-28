import z from 'zod'
import { AuthModule } from './types'

const LoginSchema = z.object({
  username: z.string().max(50),
  password: z.string().max(50),
})

export const resolvers: AuthModule.Resolvers = {
  Mutation: {
    signIn: async (_, args, context) => {
      LoginSchema.parse(args.input)

      const { username, password } = args.input

      const login: 'email' | 'username' = z.string().email().safeParse(username).success
        ? 'email'
        : 'username'

      const user =
        login === 'email'
          ? await context.dataSources.users.findUnique({ where: { email: username } })
          : await context.dataSources.users.findUnique({ where: { username } })

      // TODO: Encrypt password, improve security and update validation.
      if (!user || password !== user?.password) {
        return { success: false, message: `Invalid ${login} or password.` }
      }

      return { success: true, message: 'Logged in.', user }
    },
  },
}
