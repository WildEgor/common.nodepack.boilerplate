import { ExceptionCodes } from '../exception.codes';
import { ServiceErrorCodes } from '../service-error-codes';
import { HttpServerException } from '../service-exceptions';

/**
 * @description For third part APIs
 * @class ExternalServiceErrorException
 * @extends {HttpServerException}
 */
export class ExternalServiceErrorException extends HttpServerException {

  readonly code = ExceptionCodes.UNKNOWN_ERROR;

  constructor(message = 'Error occurs in external service!') {
    super(ServiceErrorCodes.External, message);
  }

}
