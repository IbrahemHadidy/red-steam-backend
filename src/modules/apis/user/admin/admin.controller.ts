import { Get, Controller, HttpCode, Query, UseGuards, Param, Delete, Body, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { AdminService } from '@apis/user/admin/admin.service';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Dtos
import { UpdateUserDto } from '@apis/user/admin/dtos/update-user.dto';

// Swagger descriptors
import { getUsersPaginatedDescriptor } from '@apis/user/admin/api-descriptors/get-users-paginated.descriptor';
import { deleteUserDescriptor } from '@apis/user/admin/api-descriptors/delete-user.descriptor';
import { updateUserDescriptor } from '@apis/user/admin/api-descriptors/update-user.descriptor';

@Controller('user/admin')
@ApiTags('User Admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @ApiDescriptor(getUsersPaginatedDescriptor)
  @Get('paginated')
  @HttpCode(200)
  async getUsersPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.admin.getUsersPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(searchQuery) : {},
    );

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updateUserDescriptor)
  @Put(':id')
  @HttpCode(200)
  async updateTag(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const result = await this.admin.updateUser(id, body);

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deleteUserDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    const result = await this.admin.deleteUser(id);

    // Send the response
    return result;
  }
}