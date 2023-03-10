import { Injectable } from '@nestjs/common';
import { IAppConfig } from '../../../core/microservices';
import { ConfigService } from '../../../shared';

@Injectable()
export class AppConfig implements IAppConfig {

  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;

  constructor(configService: ConfigService) {
    this.name = configService.getString('APP_NAME');
    this.port = configService.getNumber('APP_PORT');
    this.isProduction = configService.getBoolean('APP_PRODUCTION');
  }

  public get now(): Date {
    return new Date();
  }

}
