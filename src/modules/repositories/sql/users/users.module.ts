import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { UsersService } from '@repositories/sql/users/users.service';
import { User } from '@repositories/sql/users/user.entity';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, GameTag], 'sql')],
  providers: [GamesTagsService, UsersService, Logger],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
