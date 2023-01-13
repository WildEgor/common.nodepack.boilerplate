import { LoggerConstants } from './logger.constants';

export class LoggerUtils {

  public static getOptionsToken(): string {
    return LoggerConstants.optionsToken;
  }

  public static getConnectionToken(): string {
    return LoggerConstants.connectionToken;
  }

}
