#!/usr/bin/env tsx

import { knex } from '../pg/knex'
import { faker } from '@faker-js/faker'
import {
  ECountryCode,
  EFormat,
  EUserRole,
  EUserType,
  ELanguage,
  EUserActionName,
  EActionNamespace,
} from 'schemas'
import addHours from 'date-fns/addHours'

export async function seed(args: string[]) {
  if (args.includes('insert')) {
    const [author] = await knex('authors').insert({ name: 'Marcus Aurelius' }).returning('id')
    const [topic] = await knex('topics').insert({ name: 'History' }).returning('id')
    const [subtopic] = await knex('subtopics').insert({ name: 'History of the world' }).returning('id')
    const booksData = [
      {
        title: 'The emperor handbook',
        cover: 'https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780743233835_9780743233835_hr.jpg',
        description:
          'Written in Greek, without any intention of publication, by the only Roman emperor who was also a philosopher, the Meditations of Marcus Aurelius (AD 121-180) offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe. ',
      },
      {
        title: 'Meditations',
        cover: 'https://images.cdn2.buscalibre.com/fit-in/360x360/6c/01/6c014941d896146d15a044484548b6d4.jpg',
        description:
          'Meditations is a series of personal writings by Marcus Aurelius, Roman Emperor from AD 161 to 180, recording his private notes to himself and ideas on Stoic philosophy.',
      },
    ]
    const [user] = await knex('users')
      .insert({
        countryCode: ECountryCode.Co,
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        role: EUserRole.LenderBorrower,
        type: EUserType.User,
        username: faker.internet.userName(),
      })
      .returning('id')
    const [books] = await Promise.all(
      booksData.map(({ title, cover, description }) =>
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
            format: EFormat.Book,
            isbn: faker.phone.number('#############'),
            isDisabled: false,
            isRestricted: false,
            isWithdrawn: false,
            language: ELanguage.English,
            numPages: faker.datatype.number({ min: 1, max: 10000 }),
            publicationCity: faker.address.cityName(),
            publicationCountry: faker.address.country(),
            subtitle: faker.lorem.sentences(1),
            title,
            user: user.id,
          })
          .returning('id')
      )
    )
    await Promise.all(
      books.map((book) => {
        knex('bookTopics').insert({ bookId: book.id, topicId: topic.id })
        knex('bookSubtopics').insert({ bookId: book.id, subtopicId: subtopic.id })
      })
    )

    await knex('actions').insert({
      namespace: EActionNamespace.UserFlow,
      name: EUserActionName.ResetPassword,
      userId: user.id,
      metadata: { expiresAt: addHours(new Date(), 3), redeemed: false },
    })
  }

  console.log(await knex('authors'))
  console.log(await knex('books'))
  console.log(await knex('actions'))
}

if (process.argv.slice(2).length) {
  seed(process.argv.slice(2))
}
