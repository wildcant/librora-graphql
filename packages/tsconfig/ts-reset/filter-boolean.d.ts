/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="utils.d.ts" />

interface Array<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): TSReset.NonFalsy<T>[]
}

interface ReadonlyArray<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): TSReset.NonFalsy<T>[]
}
