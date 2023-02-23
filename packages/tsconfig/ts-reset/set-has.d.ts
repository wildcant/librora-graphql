/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="utils.d.ts" />

interface Set<T> {
  has(value: T | (TSReset.WidenLiteral<T> & {})): boolean
}
