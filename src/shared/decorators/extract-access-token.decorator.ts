import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ResultFactory } from '../../core/microservices';

/**
 * Extract standard JWT token
 */
export const ExtractAccessToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }

    const authorization: string = request.headers.authorization;
    if (
      !authorization
      || !authorization.trim().startsWith('Bearer')
      || authorization.split(' ').length !== 2
    ) {
      ResultFactory.unauthorized(
        'Access token not found!',
        'UNAUTHORIZED_CODE',
      );
    }

    return authorization.split(' ')[1];
  },
);
