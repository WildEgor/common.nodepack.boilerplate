import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ILoggerClientOptions, LoggerClient } from '../client';
import { ILoggerAsyncOptions, ILoggerConfigFactory } from './logger.interfaces';
import { LoggerUtils } from './logger.utils';

@Global()
@Module({})
export class LoggerModule {

  public static forRoot(options: ILoggerClientOptions): DynamicModule {
    const LoggerOptionsProvider: Provider = {
      provide: LoggerUtils.getOptionsToken(),
      useValue: options,
    };

    const LoggerConnectionProvider: Provider = {
      provide: LoggerUtils.getConnectionToken(),
      useFactory: () => LoggerClient.init(options),
    };

    return {
      module: LoggerModule,
      providers: [
        LoggerOptionsProvider,
        LoggerConnectionProvider,
      ],
      exports: [
        LoggerConnectionProvider,
      ],
    };
  }

  public static forRootAsync(asyncOptions: ILoggerAsyncOptions): DynamicModule {
    const LoggerOptionsProvider: Provider = {
      provide: LoggerUtils.getOptionsToken(),
      useFactory(optionsFactory: ILoggerConfigFactory) {
        return optionsFactory.createLoggerConfig();
      },
      inject: [asyncOptions.useExisting],
    };

    const LoggerConnectionProvider: Provider = {
      provide: LoggerUtils.getConnectionToken(),
      useFactory: (options: ILoggerClientOptions) => LoggerClient.init(options),
      inject: [LoggerUtils.getOptionsToken()],
    };

    return {
      module: LoggerModule,
      imports: asyncOptions.imports,
      providers: [
        LoggerOptionsProvider,
        LoggerConnectionProvider,
      ],
      exports: [
        LoggerConnectionProvider,
      ],
    };
  }

}
