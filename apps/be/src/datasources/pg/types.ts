export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}

export type OmitId<T> = Omit<T, 'id'>
export type RequiredId<T> = OmitId<T> & { id: string }
export type OptionalId<T> = OmitId<T> & { id?: string | undefined }

export type Enumerable<T> = T | Array<T>

type FindUniqueArgs<T, TUniqueProperties> = {
  where: RequireAtLeastOne<TUniqueProperties>
  select?: (keyof T)[] | undefined
}

export type FindManyArgs<T> = {
  where?: RequireAtLeastOne<T>
  select?: (keyof T)[] | undefined
  limit?: number
  offset?: number
}

export type ListKeys<T, K extends Array<keyof T> | undefined> = K extends readonly (infer U)[] ? U : never

type GetEntityPayload<
  T,
  TUniqueProperties,
  S extends FindUniqueArgs<T, TUniqueProperties> | FindManyArgs<T>,
  U = keyof S
> = 'select' extends U ? { [P in ListKeys<T, S['select']>]: P extends keyof T ? T[P] : never } : T

type HasSelect<T> = {
  select?: (keyof T)[] | undefined
}

export type CheckSelect<T, S, U> = T extends HasSelect<S> ? U : S

export type DynamicFindManyResponse<T, Q extends FindManyArgs<T>, TUniqueProperties = { id: string }> =
  Promise<Array<CheckSelect<Q, T, GetEntityPayload<T, TUniqueProperties, Q>> | null>>

/**
 * Contract for all data sources.
 */
export type PgDataSource<T, TUniqueProperties = { id: string }> = {
  /** Lets you retrieve a single database record by id or unique attribute */
  findUnique<Q extends FindUniqueArgs<T, TUniqueProperties>>(
    query: Q
  ): Promise<CheckSelect<Q, T, GetEntityPayload<T, TUniqueProperties, Q>> | null>

  /** Returns a list of records. */
  findMany<Q extends FindManyArgs<T>>(query: Q): DynamicFindManyResponse<T, Q, TUniqueProperties>

  /** Creates a new database record. */
  create: (data: OmitId<T>) => Promise<T | undefined>

  /** Updates an existing database record. */
  update: (query: { where: Partial<T>; data: Partial<T> }) => Promise<T | undefined>
  /*
  TODO: Implement the following methods:
  
  // upsert does the following:
  // If an existing database record satisfies the where condition, it updates that record
  // If no database record satisfies the where condition, it creates a new database record
  upsert

  //  deletes an existing database record. You can delete a record by ID or by a unique attribute
  delete

  // creates multiple records in a transaction.
  createMany

  // updates a batch of existing database records in bulk and returns the number of updated records.
  updateMany 

  // deletes multiple records in a transaction.
  deleteMany

  // 
  count
  */
}
