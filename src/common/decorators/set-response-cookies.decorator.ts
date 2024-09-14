// NestJS
import { UseInterceptors } from '@nestjs/common';

// Interceptors
import { SetResponseCookiesInterceptor } from '@interceptors/set-response-cookies.interceptor';

/**
 * Decorator to set response JWT tokens in HttpOnly cookies
 * @returns Set JWT tokens in HttpOnly cookies on response
 */
export function SetResponseCookies(): MethodDecorator {
  return UseInterceptors(new SetResponseCookiesInterceptor());
}
