import { UserModel, UserSchema } from 'schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IUserDataSource extends PgDataSource<UserModel> {}

export const usersDataSource: IUserDataSource = {
  findUnique: (id) => loaders.userById.load(id),
  findMany: (ids) => loaders.userById.loadMany(ids),
  create: async (data) => {
    UserSchema.parse(data)
    const [user] = await knex('users').insert(data).select('*')
    return user
  },
}
