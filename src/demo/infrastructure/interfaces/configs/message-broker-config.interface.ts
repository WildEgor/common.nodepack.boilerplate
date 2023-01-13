export interface IMessageBrokerConfig {
  hostname: string;
  port: number;
  username: string;
  password: string;
  serviceQueue: string;

  getUrl(): string;
}
