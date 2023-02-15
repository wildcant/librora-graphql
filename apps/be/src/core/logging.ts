import PrettyError from 'pretty-error'
import { ZodError } from 'zod'

const pe = new PrettyError()

export type LogSeverity =
  | 'DEFAULT'
  | 'DEBUG'
  | 'INFO'
  | 'NOTICE'
  | 'WARNING'
  | 'ERROR'
  | 'CRITICAL'
  | 'ALERT'
  | 'EMERGENCY'

export function log(severity: LogSeverity, data: string | Record<string, unknown> | Error | unknown) {
  if (data instanceof Error || data instanceof ZodError) {
    // TODO: Use winston in prod.
    console.error(pe.render(data))
  } else {
    console.debug(severity, data)
  }
}
