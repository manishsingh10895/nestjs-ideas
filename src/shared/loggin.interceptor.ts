import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        handler: CallHandler
    ): Observable<any> {
        const req = context.switchToHttp().getRequest();

        const method = req.method;

        const url = req.url;
        const now = Date.now();

        return handler.handle().pipe(
            tap(_ => {
                Logger.log(`${url} ${method} ${Date.now() - now}ms`, context.getClass().name)
            })
        );
    }
}