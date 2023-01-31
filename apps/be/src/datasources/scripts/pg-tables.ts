#!/usr/bin/env tsx

import {
  ACTION_NAMES,
  EActionNamespace,
  ECountryCode,
  EFormat,
  ELanguage,
  EUserRole,
  EUserType,
} from '@librora/schemas'
import { knex } from '../pg/knex'

export async function createTables() {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

  await knex.schema.createTable('users', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.enum('countryCode', Object.values(ECountryCode)).nullable()
    table.string('email').index()
    table.string('firstName')
    table.boolean('hasConversations')
    table.boolean('isEmailValidated').defaultTo(false)
    table.string('lastName')
    table.string('password')
    table.boolean('requiresCookieConsent')
    table.enum('role', Object.values(EUserRole))
    table.enum('type', Object.values(EUserType))
    table.string('username').index()

    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('actions', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.uuid('userId').notNullable().references('users.id').onDelete('CASCADE').onUpdate('CASCADE').index()
    table.enum('namespace', Object.values(EActionNamespace))
    table.enum('name', ACTION_NAMES)
    table.jsonb('metadata').notNullable().defaultTo('{}')
    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('authors', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))

    table.string('name')
    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('publishers', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('url')
    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('books', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))

    table.boolean('activated')

    table.uuid('author')
    table.foreign('author').references('id').inTable('authors')

    table.string('cover')
    table.string('coverThumbnail')
    table.string('coverThumbnailMini')
    table.string('date')
    table.string('description', 500)
    table.string('editionNumber')
    table.enum('format', Object.values(EFormat))
    table.string('isbn')
    table.boolean('isDisabled')
    table.boolean('isRestricted')
    table.boolean('isWithdrawn')
    table.enum('language', Object.values(ELanguage))
    table.integer('numPages')
    table.string('publicationCity')
    table.string('publicationCountry')

    table.uuid('publisher')
    table.foreign('publisher').references('id').inTable('publishers')

    table.string('subtitle')

    // table.uuid('subtopics')
    // table.foreign('subtopics').references('id').inTable('subtopics')

    table.string('title')

    // table.uuid('topics')
    // table.foreign('topics').references('id').inTable('topics')

    table.uuid('user')
    table.foreign('user').references('id').inTable('users')

    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('topics', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('colorCode')
    table.string('uniqueUrl')
    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('booksTopics', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))

    table.uuid('bookId')
    table.foreign('bookId').references('id').inTable('books')

    table.uuid('topicId')
    table.foreign('topicId').references('id').inTable('topics')

    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('subtopics', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('name').notNullable()
    table.string('colorCode')
    table.string('uniqueUrl')
    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })

  await knex.schema.createTable('booksSubtopics', function (table) {
    table.uuid('id', { primaryKey: true }).defaultTo(knex.raw('uuid_generate_v4()'))

    table.uuid('bookId')
    table.foreign('bookId').references('id').inTable('books')

    table.uuid('subtopicId')
    table.foreign('subtopicId').references('id').inTable('subtopics')

    table.timestamps({ useCamelCase: true, useTimestamps: true })
  })
}
