import { Module } from '@nestjs/common';
import { UserAdminController } from '@apis/admin/user-admin/user-admin.controller';

@Module({
  controllers: [UserAdminController],
})
export class UserAdminModule {}
