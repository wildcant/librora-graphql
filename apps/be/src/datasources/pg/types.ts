export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

/**
 * Contract for all data sources.
 */

export interface PgDataSource<T, TUniqueProperties = { id: string }> {
  /** Lets you retrieve a single database record by id or unique attribute */
  findUnique: (query: { where: RequireAtLeastOne<TUniqueProperties> }) => Promise<T | null>

  /** Returns the first record in a list that matches your criteria. */
  // findFirst: (query: { where: Partial<T> }) => Promise<T | null>

  /** Returns a list of records. */
  findMany: (ids: string[]) => Promise<(T | Error | null)[]>

  /** Creates a new database record. */
  create: (data: T) => Promise<T | null>

  /*
  TODO: Implement the following methods:

  // updates an existing database record.
  update

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
