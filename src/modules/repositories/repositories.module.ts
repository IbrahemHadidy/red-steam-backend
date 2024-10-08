// NestJS
import { Module } from '@nestjs/common';

// DB Modules
import { MongoModule } from '@repositories/mongo/mongo.module';
import { SqlModule } from '@repositories/sql/sql.module';

@Module({
  imports: [SqlModule, MongoModule],
})
export class RepositoriesModule {}
