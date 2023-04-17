import { ApolloServerErrorCode } from '@apollo/server/errors'
import { UserModel, UserSchema } from 'schemas'
import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import { Knex } from 'knex'
import { Loaders } from './loaders'
import { PgDataSource } from './types'

export type UserUniquerProperties = Pick<UserModel, 'id' | 'email' | 'username'>
export type UserDataSource = PgDataSource<UserModel, UserUniquerProperties>

// Wether or not a string is a bcrypt hash.
export const isHashed = (hash: string): boolean => {
  return hash.startsWith('$2b$')
}

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
    const records = knex('users')
      .where(where)
      .select(select ?? '*')
    return records
  },

  create: async (data) => {
    UserSchema.partial({ id: true }).parse(data)
    const password = bcrypt.hashSync(data.password, 10)
    data.password = password
    const [record] = await knex('users').insert(data).returning('*')
    return record
  },

  update: async ({ where, data }) => {
    // TODO: Investigate how to validate updates.
    if (data.password && !isHashed(data.password)) data.password = bcrypt.hashSync(data.password, 10)
    const [record] = await knex('users').where(where).update(data).returning('*')
    return record
  },
})
