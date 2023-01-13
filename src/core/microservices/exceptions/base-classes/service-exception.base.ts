import { ServiceVoidResponse } from '../../interface-adapters';
import { ExceptionBase } from './exception.base';

export abstract class ServiceException extends ExceptionBase {

  abstract statusCode: number;

  public toResponse(serviceName?: string): ServiceVoidResponse {
    return {
      data: {
        status: false,
        message: this.toJSON().message,
        errorCode: this.toJSON().code,
        serviceName,
      },
      statusCode: this.statusCode,
    };
  }

}
