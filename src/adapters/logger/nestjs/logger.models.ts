export interface ILoggerRequest {
  headers: unknown;
  body: unknown;
  duration: number;
  user: unknown;
  meta: unknown;
}

export interface ILoggerData {
  request: ILoggerRequest;
}

export interface IUserLoggerRequest {
  ip: string;
  user_id: string;
  user_agent: string | null;
  body: unknown;
}
