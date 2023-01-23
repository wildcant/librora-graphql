/**
 * Contract for all data sources.
 */

export interface PgDataSource<T> {
  findUnique: (id: string) => Promise<T>
  findMany: (ids: string[]) => Promise<(T | Error)[]>
}
