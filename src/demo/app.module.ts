import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { FastifyReply, FastifyRequest } from 'fastify';
import { LoggerModule } from '../adapters';
import { LoggerModule as InternalLogger } from './infrastructure/adapters/logger/logger.module';
import { UnitOfWorkModule } from './infrastructure/adapters/unit-of-work/unit-of-work.module';
import { ConfigModule } from './infrastructure/configs/config.module';
import { LoggerConfig } from './infrastructure/configs/logger.config';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      useFactory: () => ({
        autoSchemaFile: true,
        graphiql: true,
        fieldResolverEnhancers: ['interceptors'],
        defineMutation: true,
        context: ((ctx: unknown): unknown => (ctx)),
        cors: {
          origin: '*',
          credentials: true,
        },
      }),
    }),
    UnitOfWorkModule,
    InternalLogger,
    LoggerModule.forRootAsync({
      useExisting: LoggerConfig,
      imports: [ConfigModule],
    }),
    HealthCheckModule,
    SampleModule,
  ],
})
export class AppModule {
}
