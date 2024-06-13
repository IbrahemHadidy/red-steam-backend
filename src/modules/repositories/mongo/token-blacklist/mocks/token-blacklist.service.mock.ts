import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';

export class TokenBlacklistServiceMock implements Partial<TokenBlacklistService> {
  private blacklistedTokens: Set<string> = new Set();

  public async blacklistToken(token: string): Promise<void> {
    if (this.blacklistedTokens.has(token)) {
      throw new ConflictException('Token already exists');
    }
    this.blacklistedTokens.add(token);
  }

  public async isBlacklisted(token: string): Promise<null> {
    if (this.blacklistedTokens.has(token)) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    return null;
  }

  public async clearAll(): Promise<void> {
    this.blacklistedTokens.clear();
  }
}
