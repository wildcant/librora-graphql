export type Prettify<T> = {
  [K in keyof T]: T[K]
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {}

export type OmitId<T> = Omit<T, 'id'>
export type RequiredId<T> = OmitId<T> & { id: string }
export type OptionalId<T> = OmitId<T> & { id?: string | undefined }
