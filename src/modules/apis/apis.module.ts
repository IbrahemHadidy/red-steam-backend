import { Module } from '@nestjs/common';
import { AdminModule } from '@apis/admin/admin.module';
import { UserModule } from '@apis/user/user.module';

@Module({
  imports: [AdminModule, UserModule],
})
export class ApisModule {}
