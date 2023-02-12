import { UserModel, UserSchema } from '@librora/schemas'

import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IUserDataSource
  extends PgDataSource<UserModel, Pick<UserModel, 'id' | 'email' | 'username'>> {}

export const usersDataSource: IUserDataSource = {
  findUnique: async ({ where, select }) => {
    const { id, username, email } = where

    if (id) {
      return loaders.userById.load({ value: id, select })
    } else if (email) {
      return loaders.userByEmail.load({ value: email, select })
    } else if (username) {
      return loaders.userByUsername.load({ value: username, select })
    } else {
      throw new Error(`Unexpected query params. No loader found for ${where}`)
    }
  },

  findMany: async ({ where = {}, select }) => {
    const ids = (await knex('users').where(where).select('id')).map(({ id }) => id)
    return loaders.userById.loadMany(ids.map((id) => ({ value: id, select })))
  },

  create: async (data) => {
    UserSchema.partial({ id: true }).parse(data)
    const [user] = await knex('users').insert(data).returning('*')
    return user
  },

  update: async ({ where, data }) => {
    // TODO: Investigate how to validate updates.
    const [user] = await knex('users').where(where).update(data).returning('*')
    return user
  },
}
