// NestJS
import { BadRequestException, Injectable } from '@nestjs/common';

// Types
import type { PipeTransform } from '@nestjs/common';

/**
 * Pipe to validate union type
 * @param allowedValues - Allowed values
 * @param options - Options for the pipe: required
 * @returns Validated value
 * @throws BadRequestException if value is not in allowed values list
 */
@Injectable()
export class UnionTypeValidationPipe<T> implements PipeTransform {
  private readonly allowedValues: T[];
  private readonly options: { optional: boolean };

  constructor(allowedValues: T[], options: { optional: boolean } = { optional: false }) {
    this.allowedValues = allowedValues;
    this.options = options;
  }

  public transform(value: unknown): T | undefined {
    if (this.options.optional && (value === undefined || value === null)) {
      return undefined;
    } else if (!this.allowedValues.includes(value as T)) {
      throw new BadRequestException(`Invalid value: ${value}. Allowed values are ${this.allowedValues.join(', ')}`);
    } else {
      return value as T;
    }
  }
}
