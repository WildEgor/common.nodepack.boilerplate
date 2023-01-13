import { HttpException, HttpStatus } from '@nestjs/common';
// eslint-disable-next-line import/no-cycle
import { ServiceResponseDto, ValidationErrorDataDto } from '../dtos';
// eslint-disable-next-line import/no-cycle
import { IServiceVoidData } from '../interfaces';
import { ServiceResponseDtoBase } from './service-response-dto.base';

export class ResultFactory {

  public static serviceName = 'unknown service';

  public static ok<T>(data: T): ServiceResponseDto<T> {
    return {
      data,
      isOk: true,
    };
  }

  public static voidOk(): ServiceResponseDto<IServiceVoidData> {
    return {
      data: {
        status: true,
        message: 'EXECUTED',
      },
      isOk: true,
    };
  }

  public static badRequest(
    message = 'Bad request',
    errorCode = 'BAD_REQUEST',
    validationErrors: ValidationErrorDataDto[] = [],
  ): void {
    throw new HttpException(
      {
        data: {
          message,
          errorCode,
          serviceName: this.serviceName,
          validationErrors,
        },
        isOk: false,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public static accessDenied(message = 'Access denied', errorCode = 'ACCESS_DENIED'): void {
    throw new HttpException(
      {
        data: { message, errorCode, serviceName: this.serviceName },
        isOk: false,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  public static unauthorized(message = 'Unauthorized', errorCode = 'UNAUTHORIZED'): void {
    throw new HttpException(
      {
        data: { message, errorCode, serviceName: this.serviceName },
        isOk: false,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  public static internalServiceError(message = 'Internal Server Error', errorCode = 'INTERNAL_SERVER_ERROR'): void {
    throw new HttpException(
      {
        data: {
          message,
          errorCode,
          serviceName: this.serviceName,
        },
        isOk: false,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  public static resolveServiceResponse<T>(
    response: ServiceResponseDtoBase<T>,
  ): ServiceResponseDto<T> {
    const payload = {
      data: response.data,
      isOk: !ServiceResponseDtoBase.isError(response),
    };
    if (ServiceResponseDtoBase.isError(response)) {
      throw new HttpException(payload, response.statusCode);
    }
    return payload;
  }

}
