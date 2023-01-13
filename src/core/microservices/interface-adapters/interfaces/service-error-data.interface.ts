// TODO: fixme
// eslint-disable-next-line import/no-cycle
import { ServiceResponseDtoBase } from '../base-classes';

export interface IServiceErrorData {
  status: boolean;
  message: string;
  serviceName: string;
  code: string;
}

export type ServiceErrorResponse = ServiceResponseDtoBase<IServiceErrorData>;
