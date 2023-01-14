import { Global, Module } from '@nestjs/common';
import { ILoggerPort } from '../../../../core/microservices';
import { InjectTokens } from '../../types/inject-tokens.type';
import { UnitOfWork } from './unit-of-work';

@Global()
@Module({
  providers: [
    {
      provide: InjectTokens.AppUnitOfWork,
      useFactory: (logger: ILoggerPort): UnitOfWork => new UnitOfWork(logger),
      inject: [InjectTokens.Logger],
    },
  ],
  exports: [
    {
      provide: InjectTokens.AppUnitOfWork,
      useFactory: (logger: ILoggerPort): UnitOfWork => new UnitOfWork(logger),
      inject: [InjectTokens.Logger],
    },
  ],
})
export class UnitOfWorkModule {}
