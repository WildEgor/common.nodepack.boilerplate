// TODO: fixme
// eslint-disable-next-line import/no-cycle
import { ServiceResponseDtoBase } from '../base-classes';

export interface IServiceVoidData {
  status: boolean;
  message: string;
  errorCode?: string;
  serviceName?: string;
  reqTime?: string;
}

export type ServiceVoidResponse = ServiceResponseDtoBase<IServiceVoidData>;
