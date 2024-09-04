// NestJS
import { ConflictException, Injectable, Logger } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
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

    // Check if the token already exists in the blacklist
    const tokenExists = await this.isBlacklisted(token);

    // If the token already exists, throw a conflict exception
    if (tokenExists) {
      this.logger.warn(`Token already blacklisted: ${token}`);
      throw new ConflictException('Token already exists in blacklist');
    }

    // Add the token to the blacklist
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

    // Check if the token already exists in the blacklist
    const blacklistedToken = await this.blacklistTokenRepository.findOne({ where: { token } });

    // If the token exists, return true
    const isBlacklisted = !!blacklistedToken;
    this.logger.log(`Token blacklisted status for ${token}: ${isBlacklisted}`);

    // Return the boolean indicating whether the token is blacklisted
    return isBlacklisted;
  }

  /**
   * Removes all tokens from the blacklist.
   */
  public async clearAll(): Promise<void> {
    this.logger.log('Clearing all tokens from the blacklist');

    // Remove all tokens from the blacklist
    await this.blacklistTokenRepository.delete({});
    this.logger.log('All tokens successfully removed from the blacklist');
  }
}
