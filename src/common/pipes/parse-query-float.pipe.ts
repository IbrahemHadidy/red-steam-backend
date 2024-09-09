// NestJS
import { Injectable, PipeTransform } from '@nestjs/common';
import { ParseFloatPipe } from '@nestjs/common/pipes';

// Types
import type { ParseFloatPipeOptions } from '@nestjs/common/pipes';

/**
 * Pipe to parse optional query floats
 * @param options - Options for ParseFloatPipe
 * @returns Parsed data
 */
@Injectable()
export class ParseQueryFloatPipe implements PipeTransform {
  private parseFloatPipe: ParseFloatPipe;

  constructor(options?: ParseFloatPipeOptions) {
    this.parseFloatPipe = new ParseFloatPipe(options);
  }

  public async transform(value: string | null | undefined): Promise<number | undefined> {
    if (value === undefined || value === null) {
      return undefined;
    }

    return await this.parseFloatPipe.transform(value, {
      type: 'query',
    });
  }
}
