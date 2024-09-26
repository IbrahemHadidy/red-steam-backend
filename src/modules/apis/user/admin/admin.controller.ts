// NestJS
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';

// Decorators
import { Serialize } from '@decorators/serialize.decorator';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Pipes
import { ParseJsonPipe } from '@pipes/parse-json.pipe';
import { UnionTypeValidationPipe } from '@pipes/union-type-validation.pipe';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { AdminService } from '@apis/user/admin/admin.service';

// Body DTOs
import { UpdateUserDto } from '@apis/user/admin/dtos/update-user.dto';

// Query DTOs
import { UserQueryDto } from '@apis/user/admin/dtos/user-search-query.dto';

// Serializer DTOs
import { PaginatedUsersDataDto } from '@apis/user/serializer-dtos/paginated-users-data.dto';

// Swagger descriptors
import { deleteUserDescriptor } from '@apis/user/admin/api-descriptors/delete-user.descriptor';
import { getUsersPaginatedDescriptor } from '@apis/user/admin/api-descriptors/get-users-paginated.descriptor';
import { updateUserDescriptor } from '@apis/user/admin/api-descriptors/update-user.descriptor';

@ApiTags('User Admin')
@Controller('user/admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @ApiDescriptor(getUsersPaginatedDescriptor)
  @Serialize(PaginatedUsersDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getUsersPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query(
      'orderBy',
      new UnionTypeValidationPipe(['username', 'email', 'country', 'isVerified', 'isAdmin', 'createdAt']),
    )
    orderBy: 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(UserQueryDto, { optional: true, validate: true }))
    searchQuery: UserQueryDto = {},
  ) {
    const result = await this.admin.getUsersPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateUserDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateTag(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const result = await this.admin.updateUser(id, body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteUserDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    const result = await this.admin.deleteUser(id);

    // Send the response
    return result;
  }
}
