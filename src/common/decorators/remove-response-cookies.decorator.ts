// NestJS
import { UseInterceptors } from '@nestjs/common';

// Interceptors
import { RemoveResponseCookiesInterceptor } from '@interceptors/remove-response-cookies.interceptor';

/**
 * Decorator to remove response JWT tokens from HttpOnly cookies
 * @returns Remove JWT tokens from HttpOnly cookies on response
 */
export function RemoveResponseCookies(): MethodDecorator {
  return UseInterceptors(new RemoveResponseCookiesInterceptor());
}
