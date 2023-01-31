import { EFormat, ELanguage } from './enums'
import z from 'zod'

export const BookSchema = z.object({
  id: z.string().uuid(),
  activated: z.boolean(),
  author: z.string(),
  cover: z.string(),
  coverThumbnail: z.string(),
  coverThumbnailMini: z.string(),
  date: z.string(),
  description: z.string(),
  editionNumber: z.number(),
  format: z.nativeEnum(EFormat),
  isbn: z.string(),
  isDisabled: z.boolean(),
  isRestricted: z.boolean(),
  isWithdrawn: z.boolean(),
  language: z.nativeEnum(ELanguage),
  numPages: z.number(),
  publicationCity: z.string(),
  publicationCountry: z.string(),
  publisher: z.string(),
  subtitle: z.string(),
  title: z.string(),
  user: z.string(),
})

/*

export interface PublisherModel {
  id: string
  name: string
  url: string
}

export interface TopicModel {
  id: string
  name: string
  colorCode: string
  uniqueUrl: string
}

export interface SubTopicModel {
  id: string
  name: string
  colorCode: string
  uniqueUrl: string
}

*/

export type BookModel = z.infer<typeof BookSchema>
