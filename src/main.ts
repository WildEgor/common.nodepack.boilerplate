import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './demo/configs/app.config';
import { MessageBrokerConfig } from './demo/configs/message-broker.config';
import { DemoModule } from './demo/demo.module';
import { GlobalExceptionsFilter } from './shared';

const bootstrap = async(): Promise<void> => {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    DemoModule,
    fastifyAdapter,
  );

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = app.get(AppConfig);
  const rabbitMqConfig = app.get(MessageBrokerConfig);
  const logger = new Logger(config.name);

  app.useGlobalFilters(new GlobalExceptionsFilter(config));

  app.connectMicroservice(
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqConfig.getUrl()],
        queue: `${rabbitMqConfig.serviceQueue.toLowerCase()}`,
        queueOptions: {
          durable: true,
        },
      },
    },
    {
      inheritAppConfig: true,
    },
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Qabat - Common Nodepack')
    .addTag('doc.json')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT Authorization',
        description: 'Enter JWT access token for authorized requests.',
        in: 'header',
      },
      'JWT Token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('/api/docs', app, document);

  await app.startAllMicroservices();
  await app.listen(config.port, '0.0.0.0', () => {
    const addr
      = process.platform === 'win32'
        ? `http://localhost:${config.port}`
        : `http://127.0.0.1:${config.port}`;
    logger.debug(`Service available on ${addr}`);
    logger.debug(`Swagger available at ${addr}/api/docs`);
  });
};

bootstrap();
