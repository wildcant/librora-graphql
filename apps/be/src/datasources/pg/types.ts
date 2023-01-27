/**
 * Contract for all data sources.
 */

export interface PgDataSource<T> {
  findUnique: (id: string) => Promise<T | null>
  findMany: (ids: string[]) => Promise<(T | Error | null)[]>
  create: (data: T) => Promise<T>
}
