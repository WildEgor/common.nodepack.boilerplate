import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './application/health-check.controller';
import { HealthCheckQueryCase } from './application/query-cases/health-check.query-case';

@Module({
  imports: [CqrsModule, TerminusModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckQueryCase],
})
export class HealthCheckModule {}
