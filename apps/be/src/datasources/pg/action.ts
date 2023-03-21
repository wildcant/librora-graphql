import { ActionModel } from '@librora/schemas'
import { Knex } from 'knex'
import { Loaders } from './loaders'
import { PgDataSource } from './types'

export type ActionDataSource = PgDataSource<ActionModel>

export const actionsDataSource = (knex: Knex, loaders: Loaders): ActionDataSource => ({
  findUnique: ({ where, select }) => loaders.actionById.load({ value: where.id, select }),

  findMany: async ({ where = {}, select }) => {
    const ids = (await knex('actions').where(where).select('id')).map(({ id }) => id) as string[]
    return loaders.actionById.loadMany(ids.map((id) => ({ value: id, select })))
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
})
