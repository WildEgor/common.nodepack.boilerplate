import { Module } from '@nestjs/common';
import { ConfigModule } from '../../configs/config.module';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { RpcController } from './rpc.controller';
import { LoggerModule } from '../../../adapters';
import { LoggerConfig } from '../../configs/logger.config';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync({
      useExisting: LoggerConfig,
      imports: [ConfigModule],
    }),
  ],
  providers: [
    TestService,
  ],
  controllers: [
    TestController,
    RpcController,
  ],
})
export class TestModule {
}
