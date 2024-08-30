import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log(exception);

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let message = '';
    let statusCode = 500;

    if (exception['code'] === 11000) {
      message = 'duplicate field';
      statusCode = 409;
    } else {
      statusCode =
        exception instanceof HttpException ? exception.getStatus() : 500;
      message =
        exception instanceof HttpException
          ? (exception.getResponse() as any).message || exception.message
          : 'Internal server error';
    }
    const responseBody = {
      statusCode,
      message,
      success: false,
    };

    httpAdapter.reply(response, responseBody, statusCode);
  }
}
