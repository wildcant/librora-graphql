import { ActionModel } from '@librora/schemas'
import { knex } from './knex'
import { loaders } from './loaders'
import { PgDataSource } from './types'

export interface IActionDataSource extends PgDataSource<ActionModel> {}

export const actionsDataSource: IActionDataSource = {
  findUnique: ({ where, select }) => loaders.userActionById.load({ value: where.id, select }),

  findMany: async ({ where = {}, select }) => {
    const ids = (await knex('actions').where(where).select('id')).map(({ id }) => id) as string[]
    return loaders.userActionById.loadMany(ids.map((id) => ({ value: id, select })))
  },

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
