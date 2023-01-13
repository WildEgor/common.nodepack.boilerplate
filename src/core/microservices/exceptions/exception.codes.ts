/**
 * Adding a `code` string with a custom status code for every
 * exception is a good practice, since when that exception
 * is transferred to another process `instanceof` check
 * cannot be performed anymore so a `code` string is used instead.
 * code enum types can be stored in a separate file, so they
 * can be shared and reused on a receiving side
 */
export enum ExceptionCodes {
  ARGUMENT_INVALID = 'ARGUMENT_INVALID',
  ARGUMENT_OUT_OF_RANGE = 'ARGUMENT_OUT_OF_RANGE',
  ARGUMENT_NOT_PROVIDED = 'ARGUMENT_NOT_PROVIDED',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
