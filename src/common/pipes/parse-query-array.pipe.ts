// NestJS
import { Injectable, PipeTransform } from '@nestjs/common';
import { ParseArrayPipe } from '@nestjs/common/pipes';

// Types
import type { ParseArrayOptions } from '@nestjs/common/pipes';

/**
 * Pipe to parse array data
 * @param options - Options for ParseArrayPipe
 * @returns Parsed data
 */
@Injectable()
export class ParseQueryArrayPipe<T> implements PipeTransform {
  private parseArrayPipe: ParseArrayPipe;

  constructor(options: ParseArrayOptions) {
    this.parseArrayPipe = new ParseArrayPipe(options);
  }

  public async transform(value: [] | null | undefined): Promise<T[] | undefined> {
    return this.parseArrayPipe.transform(value ?? [], {
      type: 'query',
    });
  }
}
