import { ApolloServerErrorCode } from '@apollo/server/errors'
import { UserModel, UserSchema } from '@librora/schemas'
import { GraphQLError } from 'graphql'
import { Knex } from 'knex'
import { Loaders } from './loaders'
import { PgDataSource } from './types'

export type UserDataSource = PgDataSource<UserModel, Pick<UserModel, 'id' | 'email' | 'username'>>

export const usersDataSource = (knex: Knex, loaders: Loaders): UserDataSource => ({
  findUnique: async ({ where, select }) => {
    const { id, username, email } = where

    if (id) return loaders.userById.load({ value: id, select })

    if (email) return loaders.userByEmail.load({ value: email, select })

    if (username) return loaders.userByUsername.load({ value: username, select })

    throw new GraphQLError(`Unexpected query params for data source. No loader found for ${where}`, {
      extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
    })
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
})
