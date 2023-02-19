export type OptionValue = string | number
export type Option<
  T extends OptionValue = string,
  TMeta extends Record<string, string | number | boolean> = {}
> = {
  value: T
  label: string
  meta?: TMeta
}
