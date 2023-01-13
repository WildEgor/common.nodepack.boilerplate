import { ExceptionBase } from '../base-classes';
import { ExceptionCodes } from '../exception.codes';

/**
 *
 * (for example: )
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {

  readonly code = ExceptionCodes.NOT_FOUND;

}
