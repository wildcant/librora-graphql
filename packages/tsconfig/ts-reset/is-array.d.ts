/* eslint-disable @typescript-eslint/no-explicit-any */
interface ArrayConstructor {
  isArray(arg: any): arg is unknown[]
}
