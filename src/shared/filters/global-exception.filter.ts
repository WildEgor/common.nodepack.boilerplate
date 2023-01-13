import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { EMPTY, Observable, throwError } from 'rxjs';
import { IAppConfig, ServiceException, ServiceVoidResponse } from '../../core/microservices';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {

  private readonly _appConfig: IAppConfig;

  constructor(appConfig: IAppConfig) {
    this._appConfig = appConfig;
  }

  catch(exception: Error, host: ArgumentsHost): Observable<unknown> {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const payload = {
      message: '',
      errorCode: 'UNKNOWN_ERROR_CODE',
      serviceName: this._appConfig.name,
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse() as ServiceVoidResponse;
      Object.assign(payload, res);
      statusCode = exception.getStatus();
    }
    else if (exception instanceof ServiceException) {
      const res = exception.toResponse() as ServiceVoidResponse;
      Object.assign(payload, res.data);
      statusCode = res?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    }
    else {
      Object.assign(payload, {
        message: exception?.message,
      });
    }

    if (this._appConfig.isProduction) {
      payload.message = 'Internal server error. Please contact with developers and try again later.';
    }
    else {
      payload.serviceName = this._appConfig.name;
    }

    const serviceResponse = {
      data: payload,
      isOk: false,
    };

    if (host.getType() === 'http') {
      const response = host.switchToHttp().getResponse();
      response.status(statusCode).send(serviceResponse);
      return EMPTY;
    }

    return throwError(serviceResponse);
  }

}
