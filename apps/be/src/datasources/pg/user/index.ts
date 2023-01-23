import { PgDataSource } from '../types'
import { loaders } from '../loaders'
import { UserModel } from './model'

export * from './model'

export interface IUserDataSource extends PgDataSource<UserModel> {}

export const usersDataSource: IUserDataSource = {
  findUnique: (id) => loaders.userById.load(id),
  findMany: (ids) => loaders.userById.loadMany(ids),
}
