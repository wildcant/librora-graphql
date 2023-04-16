export type TypeConnection<T> = {
  totalCount: number

  pageInfo: {
    hasPreviousPage: boolean

    hasNextPage: boolean
  }

  nodes: T[]
}

export const createTypeConnection = <T>(params: {
  nodes: T[]
  count: number
  limit: number
  offset: number
}): TypeConnection<T> => ({
  totalCount: params.count,
  nodes: params.nodes,
  pageInfo: {
    hasNextPage: params.offset + params.limit < params.count,
    hasPreviousPage: params.offset !== undefined && params.offset !== 0,
  },
})

export const DEFAULT_PAGE_SIZE = 10
