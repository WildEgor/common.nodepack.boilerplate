import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '../../shared';
import { AppConfig } from './app.config';
import { LoggerConfig } from './logger.config';
import { MessageBrokerConfig } from './message-broker.config';

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env', '.env.template'],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
    LoggerConfig,
    MessageBrokerConfig,
  ],
  exports: [
    ConfigService,
    AppConfig,
    MessageBrokerConfig,
    LoggerConfig,
  ],
})
export class ConfigModule {
}
