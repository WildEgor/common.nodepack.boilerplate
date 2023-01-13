import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiGetMe = (): MethodDecorator => applyDecorators(
  ApiBearerAuth('JWT Token'),
  ApiOperation({
    summary: 'Authenticate user',
  }),
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Authenticated UserDTO',
  }),
  ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  }),
  ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token not found',
  }),
);
