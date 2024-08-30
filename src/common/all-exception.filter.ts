import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    //console.log();
    if (exception['code'] === 11000) {
    }

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message = '';
    if (exception['code'] === 11000) {
      console.log(exception);
      message = 'duplicate field';
    } else {
      message =
        exception instanceof HttpException
          ? (exception.getResponse() as any).message || exception.message
          : 'Internal server error';
    }
    const responseBody = {
      statusCode,
      message,
    };

    httpAdapter.reply(response, responseBody, statusCode);
  }
}
