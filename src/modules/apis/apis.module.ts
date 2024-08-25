import { Module } from '@nestjs/common';
import { UserModule } from '@apis/user/user.module';
import { GameModule } from '@apis/game/game.module';
import { CompanyModule } from '@apis/company/company.module';
import { FeatureModule } from '@apis/feature/feature.module';
import { TagModule } from '@apis/tag/tag.module';
import { LanguageModule } from '@apis/language/language.module';
import { ReviewModule } from '@apis/review/review.module';

@Module({
  imports: [UserModule, GameModule, CompanyModule, FeatureModule, TagModule, LanguageModule, ReviewModule],
})
export class ApisModule {}
