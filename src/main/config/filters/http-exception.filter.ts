import { Response } from 'express';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Catch,
} from '@nestjs/common';

import { HttpExceptionDto } from './http-exception.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpExceptionDto, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message =
      typeof exception.response !== 'object'
        ? exception.message
        : exception.response.message;

    const statusCode = exception.status || HttpStatus.BAD_REQUEST;
    return response.status(statusCode).json({ statusCode, message });
  }
}
