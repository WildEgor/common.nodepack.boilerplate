import {
  ILoggerPort,
  ServiceResponseDtoBase,
  ServiceResponseFactory,
  UseCaseBase,
} from '../../../../../../core/microservices';
import { Inject } from '@nestjs/common';
import { InjectTokens } from '../../../../../infrastructure/types/inject-tokens.type';
import { IAppUnitOfWork } from '../../../../../infrastructure/interfaces/uow/app-unit-of-work.interface';
import { PingCommand } from './ping.command';
import { CommandHandler } from '@nestjs/cqrs';
import { IPongRes } from '../../../../../infrastructure/interfaces/sample/pong.interface';

@CommandHandler(PingCommand)
export class PingUseCase extends UseCaseBase<IPongRes, Error> {

  constructor(
    @Inject(InjectTokens.AppUnitOfWork)
    protected readonly _unitOfWork: IAppUnitOfWork,
    @Inject(InjectTokens.Logger)
    private readonly _logger: ILoggerPort,
  ) {
    super(_unitOfWork)
  }

  public async handle(
    command: PingCommand,
  ): Promise<ServiceResponseDtoBase<IPongRes>> {
    this._logger.debug(PingUseCase.name);
    return ServiceResponseFactory.ok({ pong: true })
  }
}
