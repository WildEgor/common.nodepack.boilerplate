import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { TestIntegerDto } from './test.integer.dto';
import { IIntegerReply } from './test.models';
import { TestService } from './test.service';
import { ExtractAccessToken, ResponseTimeInterceptor } from '../../../shared';
import { ApiGetMe } from '../../infrastructure/swagger/get-me.api';
import { LoggerInterceptor, LogMessage } from '../../../adapters';

@Controller({
  path: 'test',
})
@UsePipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
}))
@UseInterceptors(
  LoggerInterceptor,
  ResponseTimeInterceptor,
)
export class TestController {

  private readonly testService: TestService;

  constructor(
    testService: TestService,
  ) {
    this.testService = testService;
  }

  @LogMessage('GET_ME')
  @ApiGetMe()
  @Get('me')
  @Version('1')
  public async getMe(
    @ExtractAccessToken() token: string,
  ) {
    return;
  }

  @Get('gateway')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  public async callGateway() {
    return await this.testService.calc();
  }

  @Post('service')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  public async callService(): Promise<unknown> {
    return await this.testService.sendMessage();
  }

  @Post('empty')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async getEmpty(): Promise<void> {
    await this.testService.getEmpty();
  }

  @Get('integer/:id')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  public async getInteger(@Param() request: TestIntegerDto): Promise<IIntegerReply> {
    return await this.testService.getInteger();
  }

  @Get('error/:id')
  @Version('1')
  @HttpCode(HttpStatus.NOT_FOUND)
  public async getError(@Param() request: TestIntegerDto): Promise<void> {
    if (request.id > 0) {
      throw new NotFoundException('Some entity was not found');
    }
  }

}
