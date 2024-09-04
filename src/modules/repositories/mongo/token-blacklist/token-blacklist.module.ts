// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';

// Entities
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedToken], 'mongo')],
  providers: [TokenBlacklistService, Logger],
  exports: [TypeOrmModule, TokenBlacklistService],
})
export class TokenBlacklistModule {}
