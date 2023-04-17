import { DataSources } from 'datasources'
import addHours from 'date-fns/addHours'
import { ActionModel, EActionNamespace, EUserActionName } from 'schemas'
import { sendEmailConfirmation } from './comms/email'

const authSideEffects = (dataSources: DataSources) => ({
  async sendVerificationEmail(userId: string) {
    const emailConfirmationAction: ActionModel = {
      namespace: EActionNamespace.UserFlow,
      name: EUserActionName.EmailConfirmation,
      user: userId,
      metadata: { expiresAt: addHours(new Date(), 24), redeemed: false },
    }

    dataSources.pg.actions.create(emailConfirmationAction).then(async (action) => {
      if (!action || !action.id) {
        console.warn('It was not able to create the confirm email action.')
        return
      }

      const user = await dataSources.pg.users.findUnique({ where: { id: action.user } })
      if (!user) {
        console.warn(`User with id ${action.user} not found. Not able to send verification email.`)
        return
      }

      sendEmailConfirmation(user.email, { token: action.id })
    })
  },
})

/** Shared mutations and side effects that don't correspond to a specific resource. */
export const createSideEffects = (dataSources: DataSources) => ({
  auth: authSideEffects(dataSources),
})
