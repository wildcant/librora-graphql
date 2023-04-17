#!/usr/bin/env tsx

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import addHours from 'date-fns/addHours'
import { env } from 'env'
import { EFormat, ELanguage, EUserRole, EUserType } from 'graph/enums'
import knexBuilder, { Knex } from 'knex'
import { BookModel, EActionNamespace, EUserActionName, LocationModel, UserModel } from 'schemas'
import { OmitId } from 'types'
import { knexConfig } from '../pg'

const topicsData = [
  { name: 'History' },
  { name: 'Social Sciences' },
  { name: 'Business' },
  { name: 'Politics & International Relations' },
  { name: 'Theology & Religion' },
  { name: 'Technology & Engineering' },
  { name: 'Biological Sciences' },
  { name: 'Medicine' },
  { name: 'Education' },
  { name: 'Physical Sciences' },
  { name: 'Languages & Linguistics' },
  { name: 'Philosophy' },
  { name: 'Law' },
  { name: 'Psychology' },
  { name: 'Computer Science' },
  { name: 'Media & Performing Arts' },
]

const locationsData: OmitId<LocationModel>[] = [
  {
    city: 'Santa Marta',
    country: 'Colombia',
    zipcode: '470006',
  },
  {
    city: faker.address.city(),
    country: faker.address.country(),
    zipcode: faker.address.zipCode(),
  },
]
const booksData: Pick<BookModel, 'title' | 'cover' | 'description'>[] = [
  {
    title: 'The emperor handbook',
    cover: `${env.WEB_APP_URL}/assets/books/the-emperor-handbook.png`,
    description:
      'Written in Greek, without any intention of publication, by the only Roman emperor who was also a philosopher, the Meditations of Marcus Aurelius (AD 121-180) offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe. ',
  },
  {
    title: 'Meditations',
    cover: `${env.WEB_APP_URL}/assets/books/meditations.png`,
    description:
      'Meditations is a series of personal writings by Marcus Aurelius, Roman Emperor from AD 161 to 180, recording his private notes to himself and ideas on Stoic philosophy.',
  },
  {
    title: 'Company of One',
    cover: `${env.WEB_APP_URL}/assets/books/company-of-one.jpeg`,
    description:
      'Company Of One will teach you how going small, not big when creating your own company will bring you independence, income, and lots of free time without the hassles of having to manage employees, long meetings, and forced growth.',
  },
  {
    title: 'The Psychology of money',
    cover: `${env.WEB_APP_URL}/assets/books/the-psychology-of-money.jpeg`,
    description:
      'In the Psychology of Money, Morgan Housel teaches you how to have a better relationship with money and to make smarter financial decisions. Instead of pretending that humans are ROI-optimizing machines, he shows you how your psychology can work for and against you.',
  },
  {
    title: 'The picture of dorian gray',
    cover: `${env.WEB_APP_URL}/assets/books/the-picture-of-dorian-gray.jpeg`,
    description:
      'A radiantly handsome, impressionable, and wealthy young gentleman, whose portrait the artist Basil Hallward paints. Under the influence of Lord Henry Wotton, Dorian becomes extremely concerned with the transience of his beauty and begins to pursue his own pleasure above all else.',
  },
  {
    title: 'Popular science',
    cover: `${env.WEB_APP_URL}/assets/books/popular-science.png`,
    description:
      'Popular Science gives our readers the information and tools to improve their technology and their world.',
  },
  {
    title: 'The Crisis',
    cover: `${env.WEB_APP_URL}/assets/books/the-crisis.png`,
    description:
      'The Crisis, founded by W.E.B. Du Bois as the official publication of the NAACP, is a journal of civil rights, history, politics, and culture and seeks to educate and challenge its readers about issues that continue to plague African',
  },
  {
    title: 'Western Philosophy: An Anthology',
    cover: `${env.WEB_APP_URL}/assets/books/western-philosophy--an-anthology.png`,
    description:
      'This outstanding text will support a wide variety of introductory courses in philosophy, as well as providing more advanced students with an indispensable collection of classic source materials.',
  },
  {
    title: 'The Principles of Philosophy',
    cover: `${env.WEB_APP_URL}/assets/books/the-principles-of-philosophy.png`,
    description:
      'The book was primarily intended to replace the Aristotelian curriculum then used in French and British Universities.',
  },
]

export async function seed(knex: Knex, args: string[]) {
  if (args.includes('insert')) {
    const [author] = await knex('authors').insert({ name: 'Marcus Aurelius' }).returning('id')
    if (!author) throw new Error('error inserting author')
    const [topic] = await knex('topics').insert({ name: 'Literature' }).returning('id')
    await knex('topics').insert(topicsData)

    const [subtopic] = await knex('subtopics').insert({ name: 'History of the world' }).returning('id')
    const locations = await knex('locations').insert(locationsData).returning('id')

    const defaultPassword = bcrypt.hashSync('12345', 10)
    const usersData: OmitId<UserModel>[] = [
      {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: defaultPassword,
        role: EUserRole.LENDER_BORROWER,
        type: EUserType.USER,
        username: faker.internet.userName(),
        location: locations[0]?.id,
      },
      {
        email: 'testing.apps.wc@gmail.com',
        firstName: 'willy',
        lastName: 'Wonka',
        password: defaultPassword,
        role: EUserRole.LENDER_BORROWER,
        type: EUserType.USER,
        username: 'willo',
        location: locations[1]?.id,
      },
    ]
    const users = await knex('users').insert(usersData).returning('id')

    const validUsers = users.filter(Boolean)

    const [books] = await Promise.all(
      booksData.map(({ title, cover, description }, idx) =>
        knex('books')
          .insert({
            activated: true,
            author: author.id,
            cover,
            coverThumbnail: cover,
            coverThumbnailMini: cover,
            date: faker.date.past().toISOString(),
            description,
            editionNumber: faker.datatype.number({ min: 0, max: 10 }),
            format: EFormat.BOOK,
            isbn: faker.phone.number('#############'),
            isDisabled: false,
            isRestricted: false,
            isWithdrawn: false,
            language: ELanguage.ENGLISH,
            numPages: faker.datatype.number({ min: 1, max: 10000 }),
            publicationCity: faker.address.cityName(),
            publicationCountry: faker.address.country(),
            subtitle: faker.lorem.sentences(1),
            title,
            owner: idx === 0 ? validUsers[0]?.id! : users[1]?.id!,
            slug: title.toLowerCase().split(' ').join('-'),
          })
          .returning('id')
      )
    )
    await Promise.all(
      books!.map((book) => {
        knex('bookTopics').insert({ book: book.id, topic: topic?.id })
        knex('bookSubtopics').insert({ book: book.id, subtopic: subtopic.id })
      })
    )

    await knex('actions').insert({
      namespace: EActionNamespace.UserFlow,
      name: EUserActionName.ResetPassword,
      user: users[0]?.id!,
      metadata: { expiresAt: addHours(new Date(), 3), redeemed: false },
    })
  }

  console.info(await knex('authors'))
  console.info(await knex('books'))
  console.info(await knex('actions'))
}

if (process.argv.slice(2).length) {
  const knex = knexBuilder({
    client: knexConfig.client,
    connection: {
      host: knexConfig.connection.host,
      port: knexConfig.connection.port,
      user: knexConfig.connection.user,
      password: knexConfig.connection.password,
      database: knexConfig.connection.database,
    },
    debug: env.NODE_ENV === 'development',
  })
  seed(knex, process.argv.slice(2))
}
