import { Command, CommandProps } from '../../../../../../core/microservices';

export class PingCommand extends Command {
  constructor(props: CommandProps<unknown>) {
    super(props);
    this.payload = props;
  }

  payload: unknown;
}
