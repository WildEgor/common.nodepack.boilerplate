/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Inject, SetMetadata } from '@nestjs/common';
import { logMessage } from './logger.constants';
import { LoggerUtils } from './logger.utils';

export const InjectLogger = (): ReturnType<typeof Inject> => Inject(LoggerUtils.getConnectionToken());
export const LogMessage = (message: string) => SetMetadata(logMessage, message);
