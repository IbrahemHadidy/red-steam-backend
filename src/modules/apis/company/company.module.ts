// NestJS
import { Logger, Module } from '@nestjs/common';

// Modules
import { JwtModule } from '@nestjs/jwt';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { CompaniesModule } from '@repositories/sql/companies/companies.module';
import { UsersModule } from '@repositories/sql/users/users.module';

// Services
import { CompanyService } from '@apis/company/company.service';
import { CompaniesService } from '@repositories/sql/companies/companies.service';

// Controllers
import { DeveloperController } from '@apis/company/developer.controller';
import { PublisherController } from '@apis/company/publisher.controller';

@Module({
  imports: [CompaniesModule, UsersModule, TokenBlacklistModule, JwtModule],
  providers: [CompanyService, CompaniesService, Logger],
  controllers: [DeveloperController, PublisherController],
  exports: [CompanyService],
})
export class CompanyModule {}
