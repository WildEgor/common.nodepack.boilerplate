import { Injectable } from '@nestjs/common';
import { ILoggerClientOptions, ILoggerConfigFactory } from '../../adapters';
import { ConfigService } from '../../shared';

@Injectable()
export class LoggerConfig implements ILoggerConfigFactory {

  private readonly hostname: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly queueLogs: string;
  private readonly service: string;

  constructor(configService: ConfigService) {
    this.hostname = configService.getString('AMQP_HOST');
    this.port = configService.getNumber('AMQP_PORT');
    this.username = configService.getString('AMQP_USERNAME');
    this.password = configService.getString('AMQP_PASSWORD');
    this.queueLogs = configService.getString('LOGGER_QUEUE_LOGS');
    this.service = configService.getString('APP_NAME');
  }

  public createLoggerConfig(): ILoggerClientOptions {
    return {
      hostname: this.hostname,
      port: this.port,
      password: this.password,
      username: this.username,
      queueLogs: this.queueLogs,
      service: this.service,
    };
  }

}
