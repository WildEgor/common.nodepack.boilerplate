import { v4 as uuid } from 'uuid';
// import { Guard } from '../../guards/guard';
// import { ArgumentNotProvidedException } from '../exceptions/errors';

export type CommandProps<T> = Omit<T, 'correlationId' | 'id'> &
Partial<Command>;

export class Command {

  // ID for correlation purposes (for UnitOfWork, for commands that
  //  arrive from other microservices,logs correlation etc).
  public readonly correlationId: string;

  constructor(props: CommandProps<unknown>) {
    // if (Guard.isEmpty(props)) {
    //   throw new ArgumentNotProvidedException(
    //     'Command props should not be empty',
    //   );
    // }
    this.correlationId = props?.correlationId || uuid();
  }

}
