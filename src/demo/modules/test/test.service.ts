import { Injectable } from '@nestjs/common';
import { IIntegerReply } from './test.models';
import { ResponseFactory } from '../../infrastructure/result/service-response.factory';
import { ResultFactory } from '../../../core/microservices';

@Injectable()
export class TestService {

  constructor() {
  }

  public async calc() {
    const result = 2 + 2;
    return ResponseFactory.badRequest(String(result));
  }

  public async sendMessage() {
    return ResultFactory.voidOk();
  }

  public async getEmpty(): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  public async getInteger(): Promise<IIntegerReply> {
    return new Promise<IIntegerReply>((resolve) => {
      setTimeout(() => {
        resolve({
          value: 1000,
        });
      }, 1000);
    });
  }

}
