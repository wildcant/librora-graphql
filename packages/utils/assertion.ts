/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/ban-types */
// Function assertions
export function isFunction<T extends Function = Function>(value: any): value is T {
  return typeof value === 'function'
}

export const __DEV__ = process.env.NODE_ENV !== 'production'

export const __TEST__ = process.env.NODE_ENV === 'test'
