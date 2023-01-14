import { Global, Module } from '@nestjs/common';
import { InjectTokens } from '../../types/inject-tokens.type';
import { LoggerAdapter } from './logger.adapter';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: InjectTokens.Logger,
      useClass: LoggerAdapter,
    },
  ],
  exports: [
    {
      provide: InjectTokens.Logger,
      useClass: LoggerAdapter,
    },
  ],
})
export class LoggerModule {}
