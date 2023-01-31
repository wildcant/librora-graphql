import addHours from 'date-fns/addHours'
import isAfter from 'date-fns/isAfter'
import { ActionModel, EActionNamespace, EUserActionName } from '@librora/schemas'
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

  args.context.dataSources.actions.create(emailConfirmationAction).then((action) => {
    if (!action) {
      console.warn('It was not able to create the confirm email action.')
      return
    }
    const confirmEmailUrl = `/email-verification?token=${action.id}`
    console.log({ confirmEmailUrl })

    // sendPasswordInstructions(email, { token: action.id, confirmEmailUrl })
  })
}
