import { ServiceResponseDtoBase } from '../interface-adapters';
import { IUnitOfWorkPort } from '../ports';
import { Command } from './command.base';

/**
 * Generic use-case (command handler) (CQRS)
 */
export abstract class UseCaseBase<
  TUseCaseReturnType = unknown,
  TUseCaseError extends Error = Error,
> {

  private _uow: IUnitOfWorkPort;

  protected constructor(uow: IUnitOfWorkPort) {
    this._uow = uow;
  }

  // Forces all handlers to implement a handle method
  abstract handle(
    command: Command,
  ): Promise<
  | ServiceResponseDtoBase<TUseCaseReturnType>
  | ServiceResponseDtoBase<TUseCaseError>
  >;

  // Execute as a UnitOfWork to include
  // everything in a single atomic database transaction
  //
  execute(
    command: Command,
  ): Promise<
    | ServiceResponseDtoBase<TUseCaseReturnType>
    | ServiceResponseDtoBase<TUseCaseError>
    > {
    // eslint-disable-next-line require-await
    return this._uow.execute(command.correlationId, async() => this.handle(command));
  }

}
