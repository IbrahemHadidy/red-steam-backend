// NestJS
import { Injectable } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';

// Types
import type { DropboxToken as DropboxTokenType } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';

@Injectable()
export class DropboxTokensService {
  constructor(
    @InjectRepository(DropboxToken, 'mongo')
    private readonly dropboxTokenRepository: Repository<Partial<DropboxTokenType>>,
  ) {}

  async getToken(): Promise<Partial<DropboxToken>> {
    return await this.dropboxTokenRepository.findOne({});
  }

  async saveToken(token: Partial<DropboxToken>): Promise<Partial<DropboxTokenType>> {
    await this.dropboxTokenRepository.delete({});
    return await this.dropboxTokenRepository.save(token);
  }
}
