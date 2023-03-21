import { dataSources } from './datasources'

export const context = async () => ({ dataSources })

export type Context = Awaited<ReturnType<typeof context>>
