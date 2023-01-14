import { Module } from '@nestjs/common';
import { LoggerModule } from '../adapters';
import { LoggerModule as InternalLogger } from './infrastructure/adapters/logger/logger.module';
import { ConfigModule } from './infrastructure/configs/config.module';
import { LoggerConfig } from './infrastructure/configs/logger.config';
import { HealthCheckModule } from './modules/health-check/health-check.module';

@Module({
  imports: [
    ConfigModule,
    InternalLogger,
    LoggerModule.forRootAsync({
      useExisting: LoggerConfig,
      imports: [ConfigModule],
    }),
    HealthCheckModule,
  ],
})
export class AppModule {
}
