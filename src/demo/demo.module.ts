import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';

@Module({
  imports: [
    ConfigModule,
  ],
})
export class DemoModule {
}
