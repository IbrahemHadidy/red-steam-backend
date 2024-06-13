import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken, 'mongo')
    private readonly blacklistTokenRepository: Repository<BlacklistedToken>,
    private readonly logger: Logger,
  ) {}

  /**
   * Adds a token to the blacklist.
   * @param token - The token to blacklist.
   * @throws ConflictException if the token already exists in the blacklist.
   */
  public async blacklistToken(token: string): Promise<void> {
    this.logger.log(`Attempting to blacklist token: ${token}`);

    const tokenExists = await this.isBlacklisted(token);

    if (tokenExists) {
      this.logger.warn(`Token already blacklisted: ${token}`);
      throw new ConflictException('Token already exists in blacklist');
    }

    await this.blacklistTokenRepository.save({ token });
    this.logger.log(`Successfully blacklisted token: ${token}`);
  }

  /**
   * Checks if a token is blacklisted.
   * @param token - The token to check.
   * @returns A boolean indicating whether the token is blacklisted.
   */
  public async isBlacklisted(token: string): Promise<boolean> {
    this.logger.log(`Checking if token is blacklisted: ${token}`);

    const blacklistedToken = await this.blacklistTokenRepository.findOne({ where: { token } });

    const isBlacklisted = !!blacklistedToken;
    this.logger.log(`Token blacklisted status for ${token}: ${isBlacklisted}`);

    return isBlacklisted;
  }

  /**
   * Removes all tokens from the blacklist.
   */
  public async clearAll(): Promise<void> {
    this.logger.log('Clearing all tokens from the blacklist');
    await this.blacklistTokenRepository.delete({});
    this.logger.log('All tokens successfully removed from the blacklist');
  }
}
