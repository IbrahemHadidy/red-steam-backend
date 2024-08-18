import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Modules
import { DropboxModule } from '@services/dropbox/dropbox.module';
import { TokenBlacklistModule } from '@repositories/mongo/token-blacklist/token-blacklist.module';
import { DropboxTokensModule } from '@repositories/mongo/dropbox-tokens/token-blacklist.module';
import { GamesModule } from '@repositories/sql/games/games.module';
import { UsersModule } from '@repositories/sql/users/users.module';
import { ReviewsModule } from '@repositories/sql/reviews/reviews.module';

// Services
import { UserService } from '@apis/user/user.service';
import { AuthService } from '@apis/user/auth/auth.service';
import { ManagementService } from '@apis/user/management/management.service';
import { InteractionService } from '@apis/user/interaction/interaction.service';
import { PaymentService } from '@apis/user/payment/payment.service';

// Controllers
import { AuthController } from '@apis/user/auth/auth.controller';
import { ManagementController } from '@apis/user/management/management.controller';
import { InteractionController } from '@apis/user/interaction/interaction.controller';
import { PaymentController } from '@apis/user/payment/payment.controller';
import { PaypalModule } from '@/modules/services/paypal/paypal.module';
import { NodeMailerModule } from '@/modules/services/node-mailer/node-mailer.module';

@Module({
  imports: [
    UsersModule,
    GamesModule,
    ReviewsModule,
    DropboxTokensModule,
    DropboxModule,
    TokenBlacklistModule,
    JwtModule,
    UsersModule,
    PaypalModule,
    NodeMailerModule,
  ],
  providers: [
    UserService,
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
