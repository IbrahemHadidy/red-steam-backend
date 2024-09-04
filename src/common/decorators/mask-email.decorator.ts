// NestJS
import { UseInterceptors } from '@nestjs/common';

// Interceptors
import { MaskEmailInterceptor } from '@interceptors/mask-email.interceptor';

/**
 * Decorator to mask the email address in the response data.
 */
export const MaskEmail = (): MethodDecorator => {
  return UseInterceptors(MaskEmailInterceptor);
};
