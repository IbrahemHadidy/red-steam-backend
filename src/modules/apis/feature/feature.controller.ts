// NestJS
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

// Swagger
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';

// Guards
import { AdminGuard } from '@guards/admin.guard';
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';

// Services
import { FeatureService } from '@apis/feature/feature.service';

// DTOs
import { CreateFeatureDto } from '@apis/feature/dtos/create-feature.dto';
import { UpdateFeatureDto } from '@apis/feature/dtos/update-feature.dto';

// Swagger descriptors
import { createFeatureDescriptor } from '@apis/feature/api-descriptors/create-feature.descriptor';
import { deleteFeatureDescriptor } from '@apis/feature/api-descriptors/delete-feature.descriptor';
import { getAllFeaturesDescriptor } from '@apis/feature/api-descriptors/get-all-features.descriptor';
import { getFeatureDescriptor } from '@apis/feature/api-descriptors/get-feature.descriptor';
import { getFeaturesPaginatedDescriptor } from '@apis/feature/api-descriptors/get-features-paginated.descriptor';
import { getFeaturesDescriptor } from '@apis/feature/api-descriptors/get-features.descriptor';
import { updateFeatureDescriptor } from '@apis/feature/api-descriptors/update-feature.descriptor';

@Controller('feature')
@ApiTags('Feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(createFeatureDescriptor)
  @Post()
  @HttpCode(201)
  async createTag(@Body() body: CreateFeatureDto) {
    const result = await this.featureService.createFeature(body);

    // Send the response
    return result;
  }

  @Get(':id')
  @ApiDescriptor(getFeatureDescriptor)
  async getFeature(@Param('id') id: string) {
    const result = await this.featureService.getFeature(Number(id));

    // Send the response
    return result;
  }

  @Get('bulk/:ids')
  @ApiDescriptor(getFeaturesDescriptor)
  async getFeatures(@Param('ids') ids: string) {
    const result = await this.featureService.getFeatures(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllFeaturesDescriptor)
  @Get()
  @HttpCode(200)
  async getAllFeatures() {
    const result = await this.featureService.getAllFeatures();

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeaturesPaginatedDescriptor)
  @Get('paginated')
  @HttpCode(200)
  async getFeaturesPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'id' | 'name',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.featureService.getFeaturesPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(decodeURIComponent(searchQuery)) : {},
    );

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updateFeatureDescriptor)
  @Put(':id')
  @HttpCode(200)
  async updateFeature(@Param('id') id: string, @Body() body: UpdateFeatureDto) {
    const result = await this.featureService.updateFeature(Number(id), body);

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deleteFeatureDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deleteFeature(@Param('id') id: string) {
    const result = await this.featureService.deleteFeature(Number(id));

    // Send the response
    return result;
  }
}
