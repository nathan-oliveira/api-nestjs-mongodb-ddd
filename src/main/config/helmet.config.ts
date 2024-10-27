import { NestExpressApplication } from '@nestjs/platform-express';

import helmet from 'helmet';

export class HelmetConfig {
  private readonly app: NestExpressApplication;

  constructor(app: NestExpressApplication) {
    this.app = app;
    this.setupHelmet();
  }

  private setupHelmet() {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'cdnjs.cloudflare.com'],
            objectSrc: ["'none'"],
          },
        },
        frameguard: {
          action: 'deny',
        },
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
        dnsPrefetchControl: false,
        hidePoweredBy: true,
        ieNoOpen: true,
        noSniff: true,
        xssFilter: true,
      }),
    );
  }
}

/**
 * Properties helmet
 *
 * @property contentSecurityPolicy     CSP ajuda a detectar e mitigar certos tipos de ataques, como XSS (Cross-Site Scripting) e data injection attacks.
 * @property hsts                      Define o header Strict-Transport-Security para 1 ano
 * @property dnsPrefetchControl        Desativa o controle de prefetch de DNS
 * @property hidePoweredBy             Remove o cabeçalho 'X-Powered-By'
 * @property ieNoOpen                  Define o header X-Download-Options para IE8+
 * @property noSniff                   Define o header X-Content-Type-Options para 'nosniff'
 * @property xssFilter                 Ativa o filtro XSS do navegador
 */
