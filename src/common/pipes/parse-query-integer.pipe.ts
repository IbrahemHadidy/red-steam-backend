// NestJS
import { Injectable, PipeTransform } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';

// Types
import type { ParseIntPipeOptions } from '@nestjs/common/pipes';

/**
 * Pipe to parse optional query integer
 * @param options - Options for ParseIntPipe
 * @returns Parsed data
 */
@Injectable()
export class ParseQueryIntPipe implements PipeTransform {
  private parseIntPipe: ParseIntPipe;

  constructor(options?: ParseIntPipeOptions) {
    this.parseIntPipe = new ParseIntPipe(options);
  }

  public async transform(value: string | null | undefined): Promise<number | undefined> {
    if (value === undefined || value === null) {
      return undefined;
    }

    return await this.parseIntPipe.transform(value, {
      type: 'query',
    });
  }
}
