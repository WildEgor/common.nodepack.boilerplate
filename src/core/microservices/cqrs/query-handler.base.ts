import { ServiceResponseDtoBase } from '../interface-adapters';
import { Query } from './query.base';

/**
 * Generic query handler (CQRS)
 */
export abstract class QueryHandlerBase {

  abstract handle(
    query: Query,
  ): Promise<ServiceResponseDtoBase<unknown> | ServiceResponseDtoBase<Error>>;

  execute(
    query: Query,
  ): Promise<ServiceResponseDtoBase<unknown> | ServiceResponseDtoBase<Error>> {
    return this.handle(query);
  }

}
