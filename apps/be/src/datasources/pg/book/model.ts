export enum EFormat {
  EPUB,
  PDF,
  BOOK,
}

export enum ELanguage {
  ENG = 'English',
}

export interface BookModel {
  id: string
  activated: boolean

  /** Reference to author table. */
  author: string
  cover: string
  coverThumbnail: string
  coverThumbnailMini: string
  date: string
  description: string
  editionNumber: number
  format: EFormat
  isbn: string
  isDisabled: boolean
  isRestricted: boolean
  isWithdrawn: boolean
  language: ELanguage
  numPages: number
  publicationCity: string
  publicationCountry: string

  /** Reference to publisher table. */
  publisher?: string
  subtitle: string
  title: string

  /** Reference to user table. */
  user: string
}

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
