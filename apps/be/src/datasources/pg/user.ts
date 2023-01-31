import { UserModel, UserSchema } from '@librora/schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IUserDataSource
  extends PgDataSource<UserModel, Pick<UserModel, 'id' | 'email' | 'username'>> {}

export const usersDataSource: IUserDataSource = {
  findUnique: async (query) => {
    const { id, username, email } = query.where

    if (id) {
      return loaders.userById.load(id)
    } else if (email) {
      return loaders.userByEmail.load(email)
    } else if (username) {
      return loaders.userByUsername.load(username)
    } else {
      throw new Error(`Unexpected query params. No loader found for ${query.where}`)
    }
  },

  findMany: (ids) => loaders.userById.loadMany(ids),

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
