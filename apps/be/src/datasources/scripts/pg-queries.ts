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
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/15daee74-7d2c-4682-932c-a3337369558c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230214T164401Z&X-Amz-Expires=86400&X-Amz-Signature=70ef960a5f312a726f6210ecc121a3cfcef434c2e943103e7df7545a48ed817d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'Written in Greek, without any intention of publication, by the only Roman emperor who was also a philosopher, the Meditations of Marcus Aurelius (AD 121-180) offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe. ',
      },
      {
        title: 'Meditations',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d0ca545c-3fb6-4006-84f9-fb8057dac8dd/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230214T164434Z&X-Amz-Expires=86400&X-Amz-Signature=276e5ac806cfd98f496286544ebc6a00c32c4bf1f27b77d9dc22a6c51e918da2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'Meditations is a series of personal writings by Marcus Aurelius, Roman Emperor from AD 161 to 180, recording his private notes to himself and ideas on Stoic philosophy.',
      },
      {
        title: 'Company of One',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/67cefa11-2d1c-47f2-a00d-909bc67c4a44/image_37.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230214T162632Z&X-Amz-Expires=86400&X-Amz-Signature=d76f748b44cdb3686989b91f6ff18395cfa804dbefbe3cad4fdabebe4421df3f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22image%252037.jpg%22&x-id=GetObject',
        description:
          'Company Of One will teach you how going small, not big when creating your own company will bring you independence, income, and lots of free time without the hassles of having to manage employees, long meetings, and forced growth.',
      },
      {
        title: 'The Psychology of money',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d7d987d4-2f23-4602-a9de-8ce6fd1b8479/image_35.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230214T162635Z&X-Amz-Expires=86400&X-Amz-Signature=222a1965f5a9f783bea85c64706d4104875183e3ad2460c980c8defeb055e337&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22image%252035.jpg%22&x-id=GetObject',
        description:
          'In the Psychology of Money, Morgan Housel teaches you how to have a better relationship with money and to make smarter financial decisions. Instead of pretending that humans are ROI-optimizing machines, he shows you how your psychology can work for and against you.',
      },
      {
        title: 'The picture of dorian gray',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/934ee8ab-5b1d-4a3f-bce5-a4f85f7c0b22/image_38.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230214T162630Z&X-Amz-Expires=86400&X-Amz-Signature=2ceaa5e9896645cdf3214899c6737a350890ac6978e5ae12537ba976dcb15115&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22image%252038.jpg%22&x-id=GetObject',
        description:
          'A radiantly handsome, impressionable, and wealthy young gentleman, whose portrait the artist Basil Hallward paints. Under the influence of Lord Henry Wotton, Dorian becomes extremely concerned with the transience of his beauty and begins to pursue his own pleasure above all else.',
      },
      {
        title: 'Popular science',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/15834be9-a5f0-4b73-858b-a90dff2484b6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230213T211254Z&X-Amz-Expires=86400&X-Amz-Signature=6e41146c6ca488449f6aa17b2663696eec98fe0b8690d21a0f1346ca5c8b777c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'Popular Science gives our readers the information and tools to improve their technology and their world.',
      },
      {
        title: 'The Crisis',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4ba919bb-9ea7-47c2-9985-79b0a327f3cb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230213T211305Z&X-Amz-Expires=86400&X-Amz-Signature=59fc3d4a6b685593a95b7a4f8c4acc916e447a38dbda79b858f86c1ce1930d2b&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'The Crisis, founded by W.E.B. Du Bois as the official publication of the NAACP, is a journal of civil rights, history, politics, and culture and seeks to educate and challenge its readers about issues that continue to plague African',
      },
      {
        title: 'Western Philosophy: An Anthology',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/97893483-52b7-44f4-8a93-81428b46104e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230213T211715Z&X-Amz-Expires=86400&X-Amz-Signature=922f241c53fccde17c3672892ddd8d906d9004881c59780c6c243fab376f3a92&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'This outstanding text will support a wide variety of introductory courses in philosophy, as well as providing more advanced students with an indispensable collection of classic source materials.',
      },
      {
        title: 'The Principles of Philosophy',
        cover:
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7e867017-c382-4ecc-aacd-79939a9d4f91/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230213T211848Z&X-Amz-Expires=86400&X-Amz-Signature=85b810f072e3cee328183b36ed6848c0bf9deeea134d8a0b657d85d21ea2cd11&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject',
        description:
          'The book was primarily intended to replace the Aristotelian curriculum then used in French and British Universities.',
      },
      /*
      {
        title: '',
        cover: '',
        description: '',
      }
      */
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
