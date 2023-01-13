import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply, FastifyRequest } from 'fastify';
import { catchError, Observable, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LoggerClient, LogTypes } from '../client';
// eslint-disable-next-line import/no-cycle
import { LoggerFactory } from '../factory';
import { InjectLogger } from './logger.decorators';
import { ILoggerData } from './logger.models';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  private readonly logger: Logger;
  private readonly loggerClient: LoggerClient;
  private readonly reflector: Reflector;

  constructor(@InjectLogger() loggerClient: LoggerClient, reflector: Reflector) {
    this.logger = new Logger(LoggerInterceptor.name);
    this.loggerClient = loggerClient;
    this.reflector = reflector;
  }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const startDate = Date.now();

    // default REST Api
    if (context.getType() === 'http') {
      const headers = context.switchToHttp().getRequest<FastifyRequest>().headers;
      const res = context.switchToHttp().getResponse<FastifyReply>();
      const requestId = headers['X-REQUEST-ID'] || uuidv4();
      res.headers({
        'X-REQUEST-ID': requestId,
      });
    }

    // Graphql
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const headers = gqlContext.getContext()?.headers;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const res: FastifyReply = gqlContext.getContext()?.res;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const requestId = headers['X-REQUEST-ID'] || uuidv4();
      res.headers({
        'X-REQUEST-ID': requestId,
      });
    }

    const requestToLogs = LoggerFactory.createLogItem(context);
    const message = LoggerFactory.makeMessage(this.reflector, context);

    return next.handle().pipe(
      tap(() => {
        requestToLogs.duration = Date.now() - startDate;
        // this.logger.debug(requestToLogs);
        this.loggerClient.publishLogItem<ILoggerData>({
          type: LogTypes.info,
          message,
          data: {
            request: requestToLogs,
          },
        }).catch((error) => {
          this.logger.error(error);
        });
      }),
      catchError((caught: unknown) => {
        if (caught instanceof HttpException) {
          const response = caught.getResponse() as Record<string, unknown>;
          requestToLogs.duration = Date.now() - startDate;
          this.loggerClient.publishLogItem({
            type: LogTypes.error,
            message,
            data: {
              request: requestToLogs,
              response: response.message,
            },
          }).catch((error) => {
            this.logger.error(error);
          });
        }
        // TODO: add support for ServiceException etc
        throw caught;
      }),
    );
  }

}
