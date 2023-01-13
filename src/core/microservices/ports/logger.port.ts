export interface ILoggerPort {
  log(message: string, ...meta: unknown[]): void;
  error(message: unknown, trace?: unknown, ...meta: unknown[]): void;
  warn(message: unknown, ...meta: unknown[]): void;
  debug(message: unknown, ...meta: unknown[]): void;
  setContext?(context: string): ILoggerPort;
}
