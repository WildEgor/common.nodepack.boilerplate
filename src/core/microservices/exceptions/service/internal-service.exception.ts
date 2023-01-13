import { ExceptionCodes } from '../exception.codes';
import { ServiceErrorCodes } from '../service-error-codes';
import { HttpServerException } from '../service-exceptions';

/**
 * @description Generic exception
 * @class InternalServiceErrorException
 * @extends {HttpServerException}
 */
export class InternalServiceErrorException extends HttpServerException {

  readonly code = ExceptionCodes.UNKNOWN_ERROR;

  constructor(message = 'Internal service error...') {
    super(ServiceErrorCodes.Internal, message);
  }

}
