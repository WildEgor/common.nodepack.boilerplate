import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../shared';
import { IMessageBrokerConfig } from '../interfaces/configs/message-broker-config.interface';

@Injectable()
export class MessageBrokerConfig implements IMessageBrokerConfig {

  public readonly hostname: string;
  public readonly password: string;
  public readonly port: number;
  public readonly username: string;
  public readonly serviceQueue: string;

  constructor(configService: ConfigService) {
    this.hostname = configService.getString('AMQP_HOST');
    this.port = configService.getNumber('AMQP_PORT');
    this.username = configService.getString('AMQP_USERNAME');
    this.password = configService.getString('AMQP_PASSWORD');
    this.serviceQueue = configService.getString('APP_QUEUE');
  }

  getUrl(): string {
    return `amqp://${this.username}:${this.password}@${this.hostname}:${this.port}`;
  }

}
