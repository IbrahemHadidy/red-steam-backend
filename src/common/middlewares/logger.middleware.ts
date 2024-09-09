// NestJS
import { Injectable, Logger } from '@nestjs/common';

// Types
import type { NestMiddleware } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Logger middleware
 * @description This middleware logs request details to the console when a request is made
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  public use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const formattedDate = this.formatDate(new Date());
    const methodColor = this.getMethodColor(req.method);
    const fullUrl = `${req.originalUrl}`;

    this.logger.log(`${this.lightBlue(`[${formattedDate}]`)} ${methodColor(req.method)} ${this.brightCyan(fullUrl)}`);

    next();
  }

  private formatDate(date: Date): string {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const ampm: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
    const formattedHours: number = hours % 12 || 12;
    const formattedMinutes: string = minutes.toString().padStart(2, '0');

    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  private getMethodColor(method: string): (text: string) => string {
    switch (method.toUpperCase()) {
      case 'GET':
        return this.green;
      case 'POST':
        return this.blue;
      case 'PUT':
        return this.yellow;
      case 'DELETE':
        return this.red;
      case 'PATCH':
        return this.magenta;
      case 'OPTIONS':
        return this.cyan;
      case 'HEAD':
        return this.gray;
      default:
        return this.white;
    }
  }

  private gray(text: string): string {
    return `\x1b[90m${text}\x1b[0m`;
  }

  private green(text: string): string {
    return `\x1b[32m${text}\x1b[0m`;
  }

  private blue(text: string): string {
    return `\x1b[34m${text}\x1b[0m`;
  }

  private lightBlue(text: string): string {
    return `\x1b[94m${text}\x1b[0m`;
  }

  private yellow(text: string): string {
    return `\x1b[33m${text}\x1b[0m`;
  }

  private red(text: string): string {
    return `\x1b[31m${text}\x1b[0m`;
  }

  private cyan(text: string): string {
    return `\x1b[36m${text}\x1b[0m`;
  }

  private brightCyan(text: string): string {
    return `\x1b[96m${text}\x1b[0m`;
  }

  private magenta(text: string): string {
    return `\x1b[35m${text}\x1b[0m`;
  }

  private white(text: string): string {
    return `\x1b[37m${text}\x1b[0m`;
  }
}
