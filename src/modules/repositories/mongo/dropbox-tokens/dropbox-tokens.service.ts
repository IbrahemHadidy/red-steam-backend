import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DropboxToken } from '@repositories/mongo/dropbox-tokens/dropbox-token.entity';

@Injectable()
export class DropboxTokensService {
  constructor(
    @InjectRepository(DropboxToken, 'mongo')
    private readonly dropboxTokenRepository: Repository<Partial<DropboxToken>>,
  ) {}

  async getToken(): Promise<Partial<DropboxToken>> {
    return this.dropboxTokenRepository.findOne({});
  }

  async saveToken(token: Partial<DropboxToken>): Promise<Partial<DropboxToken>> {
    return this.dropboxTokenRepository.save(token);
  }
}
