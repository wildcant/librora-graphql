export function isBrowser() {
  return Boolean(globalThis?.document)
}
