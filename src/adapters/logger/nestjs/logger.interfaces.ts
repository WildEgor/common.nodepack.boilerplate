import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ILoggerClientOptions } from '../client';

export interface ILoggerConfigFactory {
  createLoggerConfig(): Promise<ILoggerClientOptions> | ILoggerClientOptions;
}

export interface ILoggerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting: Type<ILoggerConfigFactory>;
}
