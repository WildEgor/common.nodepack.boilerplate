import { Inject } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
import { HealthCheckQuery } from './health-check.query';
import { InjectTokens } from '../../../../../infrastructure/types/inject-tokens.type';
import {
  ILoggerPort,
  IServiceVoidData, QueryHandlerBase,
  ServiceResponseDtoBase,
  ServiceResponseFactory,
} from '../../../../../../core/microservices';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(HealthCheckQuery)
export class HealthCheckHandler extends QueryHandlerBase {

  constructor(
    @Inject(InjectTokens.Logger)
    private readonly _logger: ILoggerPort,
    private readonly _healthCheckService: HealthCheckService,
  ) {
    super();
  }

  public async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    query: HealthCheckQuery,
  ): Promise<ServiceResponseDtoBase<HealthCheckResult | IServiceVoidData>> {
    try {
      const result = await this._healthCheckService.check([]);
      return ServiceResponseFactory.ok(result);
    }
    catch (error) {
      this._logger.error(error);
    }

    return ServiceResponseFactory.internalError();
  }

}
