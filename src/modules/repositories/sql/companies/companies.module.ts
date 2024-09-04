// NestJS
import { Logger, Module } from '@nestjs/common';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { CompaniesService } from '@repositories/sql/companies/companies.service';

// Entities
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, Developer], 'sql')],
  providers: [CompaniesService, Logger],
  exports: [TypeOrmModule, CompaniesService],
})
export class CompaniesModule {}
