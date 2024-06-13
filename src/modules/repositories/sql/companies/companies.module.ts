import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer, Publisher } from '@repositories/sql/companies/company.entity';
import { CompaniesService } from '@repositories/sql/companies/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher, Developer], 'sql')],
  providers: [CompaniesService, Logger],
  exports: [TypeOrmModule, CompaniesService],
})
export class CompaniesModule {}
