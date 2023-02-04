import { ActionModel, EActionNamespace, EUserActionName } from '@librora/schemas'
import addHours from 'date-fns/addHours'
import isAfter from 'date-fns/isAfter'
import { sendEmailConfirmation } from '../../comms/email'
import { IContext } from '../../context'

export function validateResetPasswordAction(metadata: { redeemed: boolean; expiresAt: Date }): {
  message?: string
  valid: boolean
} {
  if (metadata.redeemed) {
    return { valid: false, message: 'Action redeemed' }
  }

  if (isAfter(new Date(), new Date(metadata.expiresAt))) {
    return { valid: false, message: 'Action expired' }
  }

  return { valid: true }
}

export async function sendVerificationEmail(args: { userId: string; context: IContext }) {
  const emailConfirmationAction: ActionModel = {
    namespace: EActionNamespace.UserFlow,
    name: EUserActionName.EmailConfirmation,
    userId: args.userId,
    metadata: { expiresAt: addHours(new Date(), 24), redeemed: false },
  }

  args.context.dataSources.actions.create(emailConfirmationAction).then(async (action) => {
    if (!action) {
      console.warn('It was not able to create the confirm email action.')
      return
    }

    const user = await args.context.dataSources.users.findUnique({ where: { id: action.userId } })
    if (!user) {
      console.warn(`User with id ${action.userId} not found. Not able to send verification email.`)
      return
    }
    sendEmailConfirmation(user.email, { token: action.id! })
  })
}
