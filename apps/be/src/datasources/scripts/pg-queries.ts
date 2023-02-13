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
} from '@librora/schemas'
import addHours from 'date-fns/addHours'

export async function seed(args: string[]) {
  if (args.includes('insert')) {
    const [author] = await knex('authors').insert({ name: 'Marcus Aurelius' }).returning('id')
    const [topic] = await knex('topics').insert({ name: 'History' }).returning('id')
    const [subtopic] = await knex('subtopics').insert({ name: 'History of the world' }).returning('id')
    const booksData = [
      {
        title: 'The emperor handbook',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/15daee74-7d2c-4682-932c-a3337369558c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230213T035921Z&X-Amz-Expires=86400&X-Amz-Signature=1083ca5e8904ab2de5748cfea289465340ffdc6787d79b5d0c065f685bc9dcc8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'Written in Greek, without any intention of publication, by the only Roman emperor who was also a philosopher, the Meditations of Marcus Aurelius (AD 121-180) offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe. ',
      },
      {
        title: 'Meditations',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d0ca545c-3fb6-4006-84f9-fb8057dac8dd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230213T035939Z&X-Amz-Expires=86400&X-Amz-Signature=bd03b73b32c96be18501088b74cacf1de9d79604fdf9cd6182aa83e34d9b3858&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
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
        knex('bookTopics').insert({ book: book.id, topic: topic.id })
        knex('bookSubtopics').insert({ book: book.id, subtopic: subtopic.id })
      })
    )

    await knex('actions').insert({
      namespace: EActionNamespace.UserFlow,
      name: EUserActionName.ResetPassword,
      user: user.id,
      metadata: { expiresAt: addHours(new Date(), 3), redeemed: false },
    })
  }

  console.info(await knex('authors'))
  console.info(await knex('books'))
  console.info(await knex('actions'))
}

if (process.argv.slice(2).length) {
  seed(process.argv.slice(2))
}
