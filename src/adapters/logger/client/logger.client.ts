/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-restricted-syntax */
import amqplib, { Connection } from 'amqplib';
import { ILoggerClientOptions, ILoggerClientProps, ILogItem, IPublishParam } from './logger.models';

export class LoggerClient {

  public static async init(options: ILoggerClientOptions): Promise<LoggerClient> {
    const connection = await amqplib.connect({
      hostname: options.hostname,
      port: options.port,
      username: options.username,
      password: options.password,
    });

    return new LoggerClient({
      connection,
      queueLogs: options.queueLogs,
      service: options.service,
    });
  }


  private connection: Connection;
  private queueLogs: string;
  private service: string;

  private constructor(props: ILoggerClientProps) {
    this.connection = props.connection;
    this.queueLogs = props.queueLogs;
    this.service = props.service;
  }

  private createBuffer<TData extends object>(data: TData): Buffer {
    return Buffer.from(JSON.stringify(data));
  }

  public async publishLogItem<TData>(params: IPublishParam<TData>): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(this.queueLogs, { durable: false });
    const date = new Date();
    const publishObject: ILogItem = {
      service: this.service,
      superuser: 0,
      eventDate: date.toISOString(),
      eventDateTime: date.toISOString(),
      ...params,
    };
    const data = this.createBuffer(publishObject);
    channel.sendToQueue(this.queueLogs, data);

    await channel.close();
  }

  public async close(): Promise<void> {
    await this.connection.close();
  }

}
