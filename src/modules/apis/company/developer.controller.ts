import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from '@apis/company/company.service';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Dtos
import { CreateDeveloperDto } from '@apis/company/dtos/create-developer.dto';
import { UpdateDeveloperDto } from '@apis/company/dtos/update-developer.dto';

// Swagger descriptors
import { createDeveloperDescriptor } from '@apis/company/api-descriptors/create-developer.descriptor';
import { getDeveloperDescriptor } from '@apis/company/api-descriptors/get-developer.descriptor';
import { getDevelopersDescriptor } from '@apis/company/api-descriptors/get-developers.descriptor';
import { getAllDevelopersDescriptor } from '@apis/company/api-descriptors/get-all-developers.descriptor';
import { getDevelopersPaginatedDescriptor } from '@apis/company/api-descriptors/get-developers-paginated.descriptor';
import { updateDeveloperDescriptor } from '@apis/company/api-descriptors/update-developer.descriptor';
import { deleteDeveloperDescriptor } from '@apis/company/api-descriptors/delete-developer.descriptor';

@Controller('developer')
@ApiTags('Developer')
export class DeveloperController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(createDeveloperDescriptor)
  @Post()
  @HttpCode(201)
  async createDeveloper(@Body() body: CreateDeveloperDto) {
    const result = await this.companyService.createDeveloper(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getDeveloperDescriptor)
  @Get(':id')
  @HttpCode(200)
  async getDeveloper(@Param('id') id: string) {
    const result = await this.companyService.getDeveloper(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getDevelopersDescriptor)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getDevelopers(@Param('ids') ids: string) {
    const result = await this.companyService.getDevelopers(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllDevelopersDescriptor)
  @Get()
  @HttpCode(200)
  async getAllDevelopers() {
    const result = await this.companyService.getAllDevelopers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getDevelopersPaginatedDescriptor)
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
      searchQuery ? JSON.parse(searchQuery) : {},
    );

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updateDeveloperDescriptor)
  @Put(':id')
  @HttpCode(200)
  async updateDeveloper(@Param('id') id: string, @Body() body: UpdateDeveloperDto) {
    const result = await this.companyService.updateDeveloper(Number(id), body);

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deleteDeveloperDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deleteDeveloper(@Param('id') id: string) {
    const result = await this.companyService.deleteDeveloper(Number(id));

    // Send the response
    return result;
  }
}