// NestJS
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MaskEmailInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => this.maskEmailsRecursive(data)));
  }

  private maskEmailsRecursive(data: unknown): unknown {
    if (Array.isArray(data)) {
      // If data is an array, recursively mask emails in each item
      return data.map((item) => this.maskEmailsRecursive(item));
    } else if (typeof data === 'object' && data !== null) {
      // If data is an object, recursively mask emails in the object
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = this.maskEmailsRecursive(data[key]);
        }
      }
    } else if (typeof data === 'string') {
      // If data is a string, check if it is an email and mask it
      return this.isEmail(data) ? maskEmail(data) : data;
    }

    return data;
  }

  private isEmail(value: string): boolean {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}

export const maskEmail = (email: string) => {
  // Split the email address into local part and domain part
  const [localPart, domainPart] = email.split('@');

  // Mask all characters except the first two in the local part
  const hiddenLocalPart = localPart.substring(0, 2) + localPart.substring(2).replace(/./g, '*');

  // Construct the masked email address
  const maskedEmail = hiddenLocalPart + '@' + domainPart;

  return maskedEmail;
};
