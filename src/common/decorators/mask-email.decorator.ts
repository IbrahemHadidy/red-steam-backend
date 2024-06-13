import { UseInterceptors } from '@nestjs/common';
import { MaskEmailInterceptor } from '@interceptors/mask-email.interceptor';

/**
 * Decorator to mask the email address in the response data.
 */
export const MaskEmail = () => {
  return UseInterceptors(MaskEmailInterceptor);
};
