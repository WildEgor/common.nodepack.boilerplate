/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContextType, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GraphQLResolveInfo } from 'graphql/type';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { ILoggerRequest } from '../nestjs';

export class LoggerFactory {

  static createLogItem(context: ExecutionContext): ILoggerRequest {
    if (context.getType<ContextType | 'graphql'>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo<GraphQLResolveInfo>();
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const req = gqlContext.getContext()?.req;
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const headers = gqlContext.getContext()?.req?.headers;
      const requestId = req?.headers['X-REQUEST-ID'] || uuidv4();
      // Get user that sent request
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const userId = gqlContext.getContext().req?.user?.id;
      const parentType = info.parentType.name;
      const fieldName = info.fieldName;
      const body = info.fieldNodes[0]?.loc?.source?.body;
      return {
        headers: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          'user-agent': headers['user-agent'],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          'accept-language': headers['accept-language'],
        },
        body,
        meta: {
          requestId,
          parentType,
          fieldName,
        },
        user: {
          id: userId,
          ip: req?.ip,
        },
        duration: 0,
      };
    }

    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const res = context.switchToHttp().getResponse<FastifyReply>();
    const requestId = res.getHeader('X-REQUEST-ID');
    const body = req?.body;
    const userId = (req as FastifyRequest & { user: { id: unknown } })?.user?.id;
    return {
      headers: {
        'user-agent': req?.headers['user-agent'],
        'accept-language': req?.headers['accept-language'],
      },
      body,
      meta: {
        requestId,
        query: req.query,
      },
      user: {
        id: userId,
        ip: req?.ip,
      },
      duration: 0,
    };
  }

  static makeMessage(reflector: Reflector, context: ExecutionContext): string {
    return reflector.get('loggerMessage', context.getHandler()) ?? 'Method not recognized';
  }

}
