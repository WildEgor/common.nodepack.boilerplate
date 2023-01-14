import { Module } from '@nestjs/common';
import { SampleResolver } from './sample.resolver';
import { PingUseCase } from './application/use-case/ping/ping.use-case';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    PingUseCase,
    SampleResolver
  ],
})
export class SampleModule {}
