/**
 * Maps pg query response to dataloader response.
 */
export function mapTo<R, K>(
  records: ReadonlyArray<R>,
  keys: ReadonlyArray<K>,
  keyFn: (record: R) => K
): Array<R | null> {
  const map = new Map(records.map((x) => [keyFn(x), x]))
  return keys.map((key) => map.get(key) || null)
}
