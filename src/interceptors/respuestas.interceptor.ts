// response-format.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                const httpContext = context.switchToHttp();
                const response = httpContext.getResponse();

                if (response.statusCode >= HttpStatus.BAD_REQUEST) {
                    // Si el código de estado es un error HTTP, establecemos 'ok' en falso
                    return {
                        ok: false,
                        data,
                        message: 'Error',
                    };
                }

                // Si no es un error HTTP, establecemos 'ok' en true
                let message = 'Success';
                if (data?.message) {
                    message = data.message;
                    delete data.message;
                }
                return {
                    ok: true,
                    message,
                    data,
                };
            }),
        );
    }
}
