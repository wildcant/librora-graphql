import { createSideEffects } from './side-effects'
import { createDataSources } from './datasources'

export const context = async () => {
  const dataSources = createDataSources()
  return { dataSources, sideEffects: createSideEffects(dataSources) }
}

export type Context = Awaited<ReturnType<typeof context>>
export type Datasources = Awaited<ReturnType<typeof context>>['dataSources']
