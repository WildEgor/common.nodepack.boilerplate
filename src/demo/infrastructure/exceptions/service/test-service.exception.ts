import { HttpServerException } from '../../../../core/microservices';

export class ExternalServiceErrorException extends HttpServerException {

  readonly code: string | undefined = 'EXTERNAL_SERVICE_CODE';

  constructor(message = 'Error occurs in external service!') {
    super('SERVICE_EXCEPTION', message);
  }

}
