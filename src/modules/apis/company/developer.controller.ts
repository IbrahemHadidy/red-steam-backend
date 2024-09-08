// NestJS
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

// Serializer decorator
import { Serialize } from '@decorators/serialize.decorator';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { CompanyService } from '@apis/company/company.service';

// DTOs
import { CreateDeveloperDto } from '@apis/company/dtos/create-developer.dto';
import { UpdateDeveloperDto } from '@apis/company/dtos/update-developer.dto';

// Serializer DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';

// Swagger descriptors
import { createDeveloperDescriptor } from '@apis/company/api-descriptors/create-developer.descriptor';
import { deleteDeveloperDescriptor } from '@apis/company/api-descriptors/delete-developer.descriptor';
import { getAllDevelopersDescriptor } from '@apis/company/api-descriptors/get-all-developers.descriptor';
import { getDeveloperDescriptor } from '@apis/company/api-descriptors/get-developer.descriptor';
import { getDevelopersPaginatedDescriptor } from '@apis/company/api-descriptors/get-developers-paginated.descriptor';
import { getDevelopersDescriptor } from '@apis/company/api-descriptors/get-developers.descriptor';
import { updateDeveloperDescriptor } from '@apis/company/api-descriptors/update-developer.descriptor';

@ApiTags('Developer')
@Controller('developer')
export class DeveloperController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiDescriptor(createDeveloperDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Post()
  @HttpCode(201)
  async createDeveloper(@Body() body: CreateDeveloperDto) {
    const result = await this.companyService.createDeveloper(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getDeveloperDescriptor)
  @Serialize(CompanyDto)
  @Get(':id')
  @HttpCode(200)
  async getDeveloper(@Param('id') id: string) {
    const result = await this.companyService.getDeveloper(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getDevelopersDescriptor)
  @Serialize(CompanyDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getDevelopers(@Param('ids') ids: string) {
    const result = await this.companyService.getDevelopers(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllDevelopersDescriptor)
  @Serialize(CompanyDto)
  @Get()
  @HttpCode(200)
  async getAllDevelopers() {
    const result = await this.companyService.getAllDevelopers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getDevelopersPaginatedDescriptor)
  @Serialize(CompanyDto)
  @Get('paginated')
  @HttpCode(200)
  async getDevelopersPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'id' | 'name',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.companyService.getDevelopersPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(decodeURIComponent(searchQuery)) : {},
    );

    // Send the response
    return result;
  }

  @ApiDescriptor(updateDeveloperDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateDeveloper(@Param('id') id: string, @Body() body: UpdateDeveloperDto) {
    const result = await this.companyService.updateDeveloper(Number(id), body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteDeveloperDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteDeveloper(@Param('id') id: string) {
    const result = await this.companyService.deleteDeveloper(Number(id));

    // Send the response
    return result;
  }
}
