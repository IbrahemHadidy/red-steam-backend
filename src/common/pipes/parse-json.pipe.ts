// NestJS
import { BadRequestException, Injectable } from '@nestjs/common';

// Class-transformer
import { plainToClass } from 'class-transformer';
// Class-validator
import { validateSync } from 'class-validator';

// Types
import type { PipeTransform } from '@nestjs/common';
import type { ValidationError } from 'class-validator';

/**
 * Pipe to parse JSON data
 * @param dto - DTO class
 * @param options - Options for the pipe: optional
 * @returns Parsed data
 * @throws BadRequestException if JSON data is invalid or missing
 */
@Injectable()
export class ParseJsonPipe<T extends object> implements PipeTransform<string, T> {
  private readonly options: { optional: boolean };
  private readonly dto: new () => T;

  constructor(dto: new () => T, options: { optional: boolean } = { optional: false }) {
    this.dto = dto;
    this.options = options;
  }

  public transform(value: string): T {
    if (!value || typeof value !== 'string') {
      if (!this.options.optional) {
        throw new BadRequestException('Missing required JSON query');
      }
      return undefined;
    }

    const jsonValue = JSON.parse(value);
    const dtoObject = plainToClass(this.dto, jsonValue, { excludeExtraneousValues: true });

    const errors = validateSync(dtoObject);
    if (errors.length > 0) {
      const errorMessages = errors.map((error: ValidationError) => this.formatValidationErrors(error)).join(', ');

      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    return dtoObject;
  }

  private formatValidationErrors(error: ValidationError): string {
    if (error.children && error.children.length > 0) {
      return error.children.map((child) => this.formatValidationErrors(child)).join(', ');
    }

    return Object.values(error.constraints || {}).join(', ');
  }
}
