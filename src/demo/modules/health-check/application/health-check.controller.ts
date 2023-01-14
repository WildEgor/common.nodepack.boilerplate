import {
  Controller,
  Get, UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckResult } from '@nestjs/terminus';
import { ApiGetHealthCheck } from '../../../infrastructure/swagger/health-check/get-health-check.api';
import { ResultFactory, ServiceResponseDto, ServiceResponseDtoBase } from '../../../../core/microservices';
import { LoggerInterceptor } from '../../../../adapters';
import { HealthCheckQuery } from './query/health-check.query';

@Controller('health-check')
@ApiTags('Health Check Controller')
@UseInterceptors(LoggerInterceptor)
export class HealthCheckController {

  // eslint-disable-next-line no-empty-function
  constructor(private readonly _queryBus: QueryBus) {}

  @ApiGetHealthCheck()
  @Get()
  public async healthCheck(): Promise<ServiceResponseDto<HealthCheckResult>> {
    const result: ServiceResponseDtoBase<HealthCheckResult> = await this._queryBus.execute(new HealthCheckQuery({}));
    return ResultFactory.resolveServiceResponse(result);
  }

}
