import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SetResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    // response is either have a message or a data
    return next.handle().pipe(
      map((data) => ({
        data: typeof data === 'string' ? undefined : data,
        message: typeof data === 'string' ? data : 'done',
        success: true,
      })),
    );
  }
}
