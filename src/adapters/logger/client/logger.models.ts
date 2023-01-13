/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection } from 'amqplib';
import { LogTypes } from './logger.constants';

export interface ILoggerClientOptions {
  hostname: string;
  port: number;
  username: string;
  password: string;
  queueLogs: string;
  service: string;
}

export interface ILoggerClientProps {
  connection: Connection;
  queueLogs: string;
  service: string;
}

export interface IPublishParam<TData = any> {
  type: LogTypes;
  message: string;
  data?: TData;
}

export interface IPublishUserParam {
  ip: string;
  user_id: unknown;
  user_agent: unknown;
  body: unknown;
}

export interface ILogItem<TData = unknown> extends IPublishParam<TData> {
  service: string;
  superuser: number;
  eventDate: string;
  eventDateTime: string;
}

export interface IUserLogItem extends IPublishUserParam {
  service: string;
  event_date: string;
  event_date_time: string;
}
