// TODO: fixme
// eslint-disable-next-line import/no-cycle
import { IServiceVoidData } from '../interfaces';
import { ServiceResponseDtoBase } from './service-response-dto.base';

export class ServiceResponseFactory {

  public static serviceName = 'unknown service';

  public static ok<T>(data: T): ServiceResponseDtoBase<T> {
    return {
      data,
      statusCode: 200,
    };
  }

  public static voidOk(data?: Partial<IServiceVoidData>): ServiceResponseDtoBase<IServiceVoidData> {
    return {
      data: {
        status: true,
        message: data?.message || 'EXECUTED',
        serviceName: data?.serviceName || this.serviceName,
      },
      statusCode: 200,
    };
  }

  public static internalError(data?: Partial<IServiceVoidData>): ServiceResponseDtoBase<IServiceVoidData> {
    return {
      data: {
        status: false,
        message: data?.message || 'UNKNOWN ERROR',
        errorCode: data?.errorCode || 'UNKNOWN_ERROR',
        serviceName: data?.serviceName || this.serviceName,
      },
      statusCode: 500,
    };
  }

}
