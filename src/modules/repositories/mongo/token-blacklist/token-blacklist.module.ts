import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { BlacklistedToken } from '@repositories/mongo/token-blacklist/blacklisted-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistedToken], 'mongo')],
  providers: [TokenBlacklistService, Logger],
  exports: [TypeOrmModule, TokenBlacklistService],
})
export class TokenBlacklistModule {}
