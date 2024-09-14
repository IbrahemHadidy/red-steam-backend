// NestJS
import { Injectable } from '@nestjs/common';

// RxJS
import { tap } from 'rxjs/operators';

// Types
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import type { Observable } from 'rxjs';

/**
 * Interceptor to handle removing tokens from cookies
 * @returns Remove JWT tokens from HttpOnly cookies
 */
@Injectable()
export class RemoveResponseCookiesInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap({
        next: () => {
          // Get context and response
          const ctx = context.switchToHttp();
          const response = ctx.getResponse<FastifyReply>();

          // Clear accessToken from HttpOnly cookie
          response.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
          });

          // Clear refreshToken from HttpOnly cookie
          response.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
          });
        },
      }),
    );
  }
}
