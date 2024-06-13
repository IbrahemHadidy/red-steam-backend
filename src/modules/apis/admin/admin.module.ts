import { Module } from '@nestjs/common';
import { UserAdminModule } from '@apis/admin/user-admin/user-admin.module';

@Module({
  imports: [UserAdminModule],
})
export class AdminModule {}
