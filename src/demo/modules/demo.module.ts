import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/configs/config.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { LoggerModule as InternalLogger } from '../infrastructure/adapters/logger/logger.module';
import { LoggerModule } from '../../adapters';
import { LoggerConfig } from '../infrastructure/configs/logger.config';

@Module({
  imports: [
    ConfigModule,
    InternalLogger,
    LoggerModule.forRootAsync({
      useExisting: LoggerConfig,
      imports: [ConfigModule]
    }),
    HealthCheckModule
  ],
})
export class DemoModule {
}
