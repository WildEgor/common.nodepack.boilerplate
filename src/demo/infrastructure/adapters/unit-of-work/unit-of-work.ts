import { Inject, Injectable } from '@nestjs/common';
import { ILoggerPort } from '../../../../core/microservices';
import { IAppUnitOfWork } from '../../interfaces/uow/app-unit-of-work.interface';
import { InjectTokens } from '../../types/inject-tokens.type';
import { MockUnitOfWork } from './mock-unit-of-work';

@Injectable()
export class UnitOfWork extends MockUnitOfWork implements IAppUnitOfWork {

  private readonly _logger: ILoggerPort;

  constructor(
  @Inject(InjectTokens.Logger)
    myLogger: ILoggerPort,
  ) {
    super();
    this._logger = myLogger;
  }

}
