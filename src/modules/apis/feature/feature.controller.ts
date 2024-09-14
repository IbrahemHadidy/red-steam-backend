// NestJS
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

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
import { FeatureService } from '@apis/feature/feature.service';

// Body DTOs
import { CreateFeatureDto } from '@apis/feature/dtos/create-feature.dto';
import { UpdateFeatureDto } from '@apis/feature/dtos/update-feature.dto';

// Query DTOs
import { FeatureQueryDto } from '@apis/feature/dtos/feature-search-query.dto';

// Serializer DTOs
import { FeatureDto } from '@apis/feature/serializer-dtos/feature.dto';
import { PaginatedFeaturesDataDto } from '@apis/feature/serializer-dtos/paginated-features-data.dto';

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
  async getFeature(@Param('id', ParseIntPipe) id: number) {
    const result = await this.featureService.getFeature(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getFeaturesDescriptor)
  @Serialize(FeatureDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getFeatures(@Param('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    const result = await this.featureService.getFeatures(ids);

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
  @Serialize(PaginatedFeaturesDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getFeaturesPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('orderBy', new UnionTypeValidationPipe(['id', 'name'])) orderBy: 'id' | 'name',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(FeatureQueryDto, { optional: true })) searchQuery: FeatureQueryDto = {},
  ) {
    const result = await this.featureService.getFeaturesPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(updateFeatureDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updateFeature(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateFeatureDto) {
    const result = await this.featureService.updateFeature(id, body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deleteFeatureDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteFeature(@Param('id', ParseIntPipe) id: number) {
    const result = await this.featureService.deleteFeature(id);

    // Send the response
    return result;
  }
}
