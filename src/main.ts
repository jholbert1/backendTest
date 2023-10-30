import { NestFactory } from '@nestjs/core';
import { AppModule, configApp } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const logger = new Logger('Bootstrap');

  configApp(app);

  app.enableCors();
  app.useBodyParser('json', { limit: '20mb' });

  const config = new DocumentBuilder()
    .setTitle('Backend Developer Test')
    .setDescription('This is a API create for a Backend developer Test')
    .setVersion('1.0')
    .addTag('Backend Test')
    .addBearerAuth({
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ? process.env.PORT : 3000);
  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`App running on http://localhost:${process.env.PORT}/api`);
}
bootstrap();
