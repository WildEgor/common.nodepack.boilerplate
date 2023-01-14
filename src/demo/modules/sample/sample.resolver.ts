import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { ServiceResponseDtoBase } from '../../../core/microservices';
import { PingCommand } from './application/use-case/ping/ping.command';
import { ResponseFactory } from '../../infrastructure/result/service-response.factory';
import { IPongRes } from '../../infrastructure/interfaces/sample/pong.interface';
import { PongResDto } from '../../infrastructure/dtos/sample/pong-res.dto';
import { SimpleResDto } from '../../infrastructure/dtos/sample/simple-res.dto';
import { UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from '../../../adapters';
import { ResponseTimeInterceptor } from '../../../shared';

@Resolver()
@UseInterceptors(LoggerInterceptor)
export class SampleResolver {

  constructor(
    private readonly _commandBus: CommandBus
  ) {
  }

  @Query(() => SimpleResDto)
  public async simple(): Promise<SimpleResDto> {
    return {
      message: 'Hello, World!'
    };
  }

  @Mutation(() => PongResDto)
  public async ping() {
    const res: ServiceResponseDtoBase<IPongRes> = await this._commandBus.execute(new PingCommand({}));
    return ResponseFactory.resolveServiceResponse(res).data;
  }
}
