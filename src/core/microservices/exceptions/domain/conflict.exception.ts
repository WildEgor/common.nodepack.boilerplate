import { ExceptionBase } from '../base-classes';
import { ExceptionCodes } from '../exception.codes';

/**
 *
 * (for example: )
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {

  readonly code = ExceptionCodes.CONFLICT;

}
