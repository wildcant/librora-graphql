import { PgDataSource } from '../types'
import { loaders } from '../loaders'
import { AuthorModel } from './model'

export * from './model'

export interface IAuthorDataSource extends PgDataSource<AuthorModel> {}

export const authorsDataSource: IAuthorDataSource = {
  findUnique: (id) => loaders.authorById.load(id),
  findMany: (ids) => loaders.authorById.loadMany(ids),
}
