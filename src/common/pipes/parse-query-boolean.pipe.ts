// NestJS
import { Injectable, PipeTransform } from '@nestjs/common';
import { ParseBoolPipe } from '@nestjs/common/pipes';

// Types
import type { ParseBoolPipeOptions } from '@nestjs/common/pipes';

/**
 * Pipe to parse optional query boolean
 * @param options - Options for ParseBoolPipe
 * @returns Parsed data
 */
@Injectable()
export class ParseQueryBoolPipe implements PipeTransform {
  private parseBoolPipe: ParseBoolPipe;

  constructor(options?: ParseBoolPipeOptions) {
    this.parseBoolPipe = new ParseBoolPipe(options);
  }

  public async transform(value: string | null | undefined): Promise<boolean | undefined> {
    if (value === undefined || value === null) {
      return undefined;
    }

    return await this.parseBoolPipe.transform(value, {
      type: 'query',
    });
  }
}
