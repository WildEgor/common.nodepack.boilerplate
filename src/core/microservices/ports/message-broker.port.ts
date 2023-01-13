export interface IMessageBrokerPort<TClient> {
  connect(): Promise<void>;
  getClient(): TClient;
  close(): void;
  send<TReq, TRes>(topic: string, msg: TReq): Promise<TRes>;
  emit<TReq>(topic: string, msg: TReq): Promise<void>;
}
