import { pgDataSources, OpenStreetMapDataSources } from './datasources'

export const context = async () => ({
  dataSources: { pg: pgDataSources, openstreetmap: new OpenStreetMapDataSources() },
})

export type Context = Awaited<ReturnType<typeof context>>
