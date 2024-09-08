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
import { FeatureService } from '@apis/feature/feature.service';

// DTOs
import { CreateFeatureDto } from '@apis/feature/dtos/create-feature.dto';
import { UpdateFeatureDto } from '@apis/feature/dtos/update-feature.dto';

// Serializer DTOs
import { FeatureDto } from '@apis/feature/serializer-dtos/feature.dto';

// Swagger descriptors
import { createFeatureDescriptor } from '@apis/feature/api-descriptors/create-feature.descriptor';
import { deleteFeatureDescriptor } from '@apis/feature/api-descriptors/delete-feature.descriptor';
import { getAllFeaturesDescriptor } from '@apis/feature/api-descriptors/get-all-features.descriptor';
import { getFeatureDescriptor } from '@apis/feature/api-descriptors/get-feature.descriptor';
import { getFeaturesPaginatedDescriptor } from '@apis/feature/api-descriptors/get-features-paginated.descriptor';
import { getFeaturesDescriptor } from '@apis/feature/api-descriptors/get-features.descriptor';
import { updateFeatureDescriptor } from '@apis/feature/api-descriptors/update-feature.descriptor';

@ApiTags('Feature')
@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @ApiDescriptor(createFeatureDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Post()
  @HttpCode(201)
  async createTag(@Body() body: CreateFeatureDto) {
    const result = await this.featureService.createFeature(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeatureDescriptor)
  @Serialize(FeatureDto)
  @Get(':id')
  @HttpCode(200)
  async getFeature(@Param('id') id: string) {
    const result = await this.featureService.getFeature(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeaturesDescriptor)
  @Serialize(FeatureDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getFeatures(@Param('ids') ids: string) {
    const result = await this.featureService.getFeatures(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllFeaturesDescriptor)
  @Serialize(FeatureDto)
  @Get()
  @HttpCode(200)
  async getAllFeatures() {
    const result = await this.featureService.getAllFeatures();

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeaturesPaginatedDescriptor)
  @Serialize(FeatureDto)
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

  @ApiDescriptor(updateFeatureDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateFeature(@Param('id') id: string, @Body() body: UpdateFeatureDto) {
    const result = await this.featureService.updateFeature(Number(id), body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteFeatureDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteFeature(@Param('id') id: string) {
    const result = await this.featureService.deleteFeature(Number(id));

    // Send the response
    return result;
  }
}
