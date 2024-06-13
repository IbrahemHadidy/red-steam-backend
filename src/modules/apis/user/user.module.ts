import { Logger, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';
import { TokenBlacklistService } from '@repositories/mongo/token-blacklist/token-blacklist.service';
import { UsersService } from '@repositories/sql/users/users.service';
import { GamesService } from '@repositories/sql/games/games.service';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';
import { GamesPricingService } from '@repositories/sql/games-pricing/games-pricing.service';
import { ReviewsService } from '@repositories/sql/reviews/reviews.service';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';
import { NodeMailerService } from '@services/node-mailer/node-mailer.service';
import { PaypalService } from '@services/paypal/paypal.service';
import { DriveService } from '@services/google-drive/google-drive.service';
import { UserService } from '@apis/user/user.service';
import { AuthService } from '@apis/user/auth/auth.service';
import { AuthController } from '@apis/user/auth/auth.controller';
import { ManagementService } from '@apis/user/management/management.service';
import { ManagementController } from '@apis/user/management/management.controller';
import { InteractionController } from '@apis/user/interaction/interaction.controller';
import { InteractionService } from '@apis/user/interaction/interaction.service';
import { PaymentController } from '@apis/user/payment/payment.controller';
import { PaymentService } from '@apis/user/payment/payment.service';

@Module({
  imports: [UsersModule, GamesModule, ReviewsModule, TokenBlacklistModule],
  providers: [
    JwtService,
    UsersService,
    GamesService,
    CompaniesService,
    GamesFeaturesService,
    GamesPricingService,
    GamesTagsService,
    ReviewsService,
    TokenBlacklistService,
    NodeMailerService,
    PaypalService,
    UserService,
    DriveService,
    AuthService,
    ManagementService,
    InteractionService,
    PaymentService,
    Logger,
  ],
  controllers: [AuthController, ManagementController, InteractionController, PaymentController],
  exports: [UserService],
})
export class UserModule {}
