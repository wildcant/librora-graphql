import { ActionModel } from 'schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IActionDataSource extends PgDataSource<ActionModel> {}

export const actionsDataSource: IActionDataSource = {
  findUnique: (query) => loaders.userActionById.load(query.where.id),

  findMany: (ids) => loaders.userActionById.loadMany(ids),

  create: async (data) => {
    const [record] = await knex('actions')
      .insert(data as ActionModel)
      .returning('*')

    return record
  },

  update: async ({ where, data }) => {
    const [record] = await knex('actions').where(where).update(data).returning('*')
    return record
  },
}
