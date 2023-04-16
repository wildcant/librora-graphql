import { pgDataSources } from './pg'
import { OpenStreetMapDataSources } from './openstreetmap'

export const createDataSources = () => ({
  pg: pgDataSources,
  openstreetmap: new OpenStreetMapDataSources(),
})

export type DataSources = ReturnType<typeof createDataSources>
