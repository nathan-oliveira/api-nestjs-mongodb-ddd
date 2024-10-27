import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './modules/app.module';
import { AppConfig } from './config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  Reflect.construct(AppConfig, [app, new ConfigService()]);
}

bootstrap();
