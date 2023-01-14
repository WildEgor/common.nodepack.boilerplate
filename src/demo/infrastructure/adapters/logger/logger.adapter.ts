import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ILoggerPort } from '../../../../core/microservices';

@Injectable()
export class LoggerAdapter extends ConsoleLogger implements ILoggerPort {

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  setContext(context: string): ILoggerPort {
    super.setContext(context);
    return this;
  }

  log(message: string, ...meta: unknown[]): void {
    super.log(message, meta);
  }

  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    super.error(message, trace, meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    super.warn(message, meta);
  }

  debug(message: unknown, ...meta: unknown[]): void {
    super.debug(message, meta);
  }

}
