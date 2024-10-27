import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { description, name, version } from 'src/../package.json';

export default class SwaggerConfig {
  private readonly app: NestExpressApplication;

  constructor(app: NestExpressApplication) {
    this.app = app;
    this.setupSwagger();
  }

  private setupSwagger(): void {
    const config = this.createSwaggerConfig();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('docs', this.app, document);
  }

  private createSwaggerConfig() {
    return new DocumentBuilder()
      .setTitle(name)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'Authorization',
      )
      .build();
  }
}
