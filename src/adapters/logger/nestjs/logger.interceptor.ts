import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
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

    // in case REST
    if (context.getType() === 'http') {
      const requestId = context.switchToHttp().getRequest<FastifyRequest>()?.headers['X-REQUEST-ID'] || uuidv4();
      context.switchToHttp().getResponse<FastifyReply>().headers({
        'X-REQUEST-ID': requestId,
      });
    }

    // TODO: gql impl

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
          const response = <Record<string, unknown>>caught.getResponse();
          requestToLogs.duration = Date.now() - startDate;
          this.loggerClient.publishLogItem({
            type: LogTypes.error,
            message,
            data: {
              request: requestToLogs,
              response: response?.message,
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
