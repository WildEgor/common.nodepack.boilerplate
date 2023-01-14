import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './application/health-check.controller';
import { HealthCheckHandler } from './application/query/health-check.handler';

@Module({
  imports: [CqrsModule, TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckHandler],
})
export class HealthCheckModule {}
