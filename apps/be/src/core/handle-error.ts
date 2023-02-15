import { unwrapResolverError } from '@apollo/server/errors'
import { GraphQLFormattedError } from 'graphql'
import { ZodError } from 'zod'
import { log } from './logging'

export enum CustomErrorCode {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  DATA_INCONSISTENCY = 'DATA_INCONSISTENCY',
}

export function formatError(formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError {
  log('ERROR', error)

  if (unwrapResolverError(error) instanceof ZodError) {
    const err = unwrapResolverError(error) as ZodError

    return {
      ...formattedError,
      message: err.format()._errors.toString(),
      extensions: {
        ...formattedError.extensions,
        code: CustomErrorCode.VALIDATION_FAILED,
      },
    }
  }

  return formattedError
}
