// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { UsersService } from '@repositories/sql/users/users.service';

// Entities
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { User } from '@repositories/sql/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, GameTag], 'sql')],
  providers: [GamesTagsService, UsersService, Logger],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
