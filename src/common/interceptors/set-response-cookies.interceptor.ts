// NestJS
import { Injectable } from '@nestjs/common';

// RxJS
import { tap } from 'rxjs/operators';

// Types
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { Observable } from 'rxjs';

/**
 * Interceptor to handle setting tokens in cookies
 * @returns Set JWT tokens in HttpOnly cookies
 */
@Injectable()
export class SetResponseCookiesInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap({
        next: (data?: { accessToken?: string; refreshToken?: string; loggingIn?: boolean }) => {
          // Get context, request and response
          const ctx = context.switchToHttp();
          const request = ctx.getRequest<FastifyRequest>();
          const response = ctx.getResponse<FastifyReply>();

          // Destructure data
          const { accessToken, refreshToken, loggingIn } = data;

          // Get rememberMe value
          const rememberMe: boolean = (loggingIn && request.body['rememberMe']) || false;

          // Set accessToken in HttpOnly cookie
          if (accessToken) {
            response.setCookie('accessToken', accessToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              path: '/',
              maxAge: 3600, // 1 hour
            });
          }

          // Set refreshToken in HttpOnly cookie
          if (refreshToken) {
            response.setCookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              path: '/',

              // If rememberMe & loggingIn is true, 30 days cookie, else session cookie
              maxAge: rememberMe ? 2592000 : undefined,
            });
          }

          // Remove tokens and loggingIn from response data
          delete data.accessToken;
          delete data.refreshToken;
          delete data.loggingIn;
        },
      }),
    );
  }
}
