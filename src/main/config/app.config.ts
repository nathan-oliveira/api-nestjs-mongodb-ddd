import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import CorsConfig from './cors.config';

import { HttpExceptionFilter } from './filters/http-exception.filter';
import SwaggerConfig from './swagger.config';
import { HelmetConfig } from './helmet.config';

export class AppConfig {
  private app: NestExpressApplication;
  private configService: ConfigService;

  constructor(
    readonly appNest: NestExpressApplication,
    readonly configServiceNest: ConfigService,
  ) {
    this.app = appNest;
    this.configService = configServiceNest;
    this.enableCors();
    this.setGlobalConfigs();
    this.setupSwagger();
    this.setupHelmet();
    this.listen();
  }

  private listen(): void {
    const port = this.configService.get<number>('APP_PORT', { infer: true });
    console.log(port);
    this.app.listen(port, () => console.log(`[+] http://localhost:${port}`));
  }

  private enableCors(): void {
    const config = Reflect.construct(CorsConfig, [this.configService]);
    this.app.enableCors(config.getConfig());
  }

  private setGlobalConfigs(): void {
    this.app.setGlobalPrefix('api');
    this.app.useBodyParser('json', { limit: '100mb' });
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  }

  private setupSwagger = () => Reflect.construct(SwaggerConfig, [this.app]);
  private setupHelmet = () => Reflect.construct(HelmetConfig, [this.app]);
}
