import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { StreamFile } from './file-check.pipe';

@Injectable()
export class SetResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector,) { }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,

  ): Observable<any> {
    const isSendFile = this.reflector.get(StreamFile, context.getHandler())
    // response is either have a message or a data
    if (isSendFile) {
      return next.handle().pipe(data => data)
    }
    return next.handle().pipe(
      map((data) => ({
        data: typeof data === 'string' ? undefined : data,
        message: typeof data === 'string' ? data : 'done',
        success: true,
      })),
    );
  }
}
