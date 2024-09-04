// NestJS Module
import { Module } from '@nestjs/common';

// API Modules
import { CompanyModule } from '@apis/company/company.module';
import { FeatureModule } from '@apis/feature/feature.module';
import { GameModule } from '@apis/game/game.module';
import { LanguageModule } from '@apis/language/language.module';
import { ReviewModule } from '@apis/review/review.module';
import { TagModule } from '@apis/tag/tag.module';
import { UserModule } from '@apis/user/user.module';

@Module({
  imports: [UserModule, GameModule, CompanyModule, FeatureModule, TagModule, LanguageModule, ReviewModule],
})
export class ApisModule {}
