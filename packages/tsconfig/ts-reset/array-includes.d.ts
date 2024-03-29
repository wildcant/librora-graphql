/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="utils.d.ts" />

interface ReadonlyArray<T> {
  includes(searchElement: T | (TSReset.WidenLiteral<T> & {}), fromIndex?: number): searchElement is T
}

interface Array<T> {
  includes(searchElement: T | (TSReset.WidenLiteral<T> & {}), fromIndex?: number): boolean
}
