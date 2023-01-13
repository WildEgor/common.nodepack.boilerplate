import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/config.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    ConfigModule,
    TestModule,
  ],
})
export class DemoModule {}
