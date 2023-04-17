export type NonMaybeRecursive<T> = {
  [K in keyof T]: NonNullable<T[K]>
}
