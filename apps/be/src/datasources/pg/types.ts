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
export type OptionalId<T> = OmitId<T> & { id?: string }

export type Enumerable<T> = T | Array<T>

/**
 * Contract for all data sources.
 */
export type PgDataSource<T, TUniqueProperties = { id: string }> = {
  /** Lets you retrieve a single database record by id or unique attribute */
  findUnique: (query: {
    where: RequireAtLeastOne<TUniqueProperties>
    select?: (keyof T)[]
  }) => Promise<T | null>

  /** Returns a list of records. */
  findMany: (query: {
    where?: RequireAtLeastOne<T>
    select?: (keyof T)[]
    // include?: { [key in keyof Partial<T>]: boolean }
  }) => Promise<(T | Error | null)[]>

  /** Creates a new database record. */
  create: (data: OptionalId<T>) => Promise<T | null>

  /** Updates an existing database record. */
  update: (query: { where: Partial<T>; data: Partial<T> }) => Promise<T | null>
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
