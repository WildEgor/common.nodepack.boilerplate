// TODO: fixme
// eslint-disable-next-line import/no-cycle
import { IServiceResponseDto } from '../interfaces';

export class ServiceResponseDto<T> implements IServiceResponseDto<T> {

  public data: T;
  public isOk: boolean;
  public reqTime?: string;

  constructor(data: T, isOk?: boolean, reqTime?: string) {
    this.data = data;
    this.isOk = isOk ?? true;
    this.reqTime = reqTime ?? '0.000ms';
  }

}
