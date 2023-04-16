import { EUserActionName, EUserRole, EUserType } from '@librora/schemas'
import isAfter from 'date-fns/isAfter'
import { getFields } from '../../core/graphql-to-sql'
import { sendVerificationEmail } from '../action/utils'
import { UserModule } from './types'

const userResolver: UserModule.QueryResolvers['user'] = async (_, args, context, info) =>
  context.dataSources.pg.users.findUnique({
    where: { id: args.id },
    select: getFields(info),
  })

const createUser: UserModule.MutationResolvers['createUser'] = async (_, args, context) => {
  const user = await context.dataSources.pg.users.create({
    ...args.input,
    type: EUserType.User,
    role: EUserRole.LenderBorrower,
  })

  if (!user) return { success: false, message: 'There was a problem creating your account.', user: null }

  sendVerificationEmail({ userId: user.id, context })

  return { user, success: true, message: 'User was created successfully.' }
}

const verifyEmail: UserModule.MutationResolvers['verifyEmail'] = async (_, args, context) => {
  const { token } = args.input
  // Validate reset password action.
  const action = await context.dataSources.pg.actions.findUnique({
    where: { id: token },
    // TODO: select dynamic types are overwriting discriminated types defined in zod :(
    // select: ['id', 'name', 'namespace', 'metadata'],
  })

  if (!action || action.name !== EUserActionName.EmailConfirmation) {
    return { success: false, message: 'Action not found.' }
  }

  if (action.name === EUserActionName.EmailConfirmation && action.metadata.redeemed) {
    return { success: true, message: 'Email was already verified' }
  }

  if (isAfter(new Date(), new Date(action.metadata.expiresAt))) {
    return { success: false, message: 'Action expired' }
  }

  await context.dataSources.pg.actions.update({
    where: { id: token },
    data: { metadata: { redeemed: true, expiresAt: action.metadata.expiresAt } },
  })

  return { success: true, message: 'Email verified' }
}

export const resolvers: UserModule.Resolvers = {
  Query: {
    user: userResolver,
  },

  Mutation: {
    createUser,
    verifyEmail,
  },

  User: {
    initial: (user) => user.firstName.charAt(0),
    name: (user) => `${user.firstName} ${user.lastName}`,
    location: (user, _args, context, info) =>
      user.location
        ? context.dataSources.pg.locations.findUnique({
            where: { id: user.location },
            select: getFields(info),
          })
        : null,
  },
}
