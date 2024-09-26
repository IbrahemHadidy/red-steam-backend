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
import { CompanyService } from '@apis/company/company.service';

// Body DTOs
import { CreatePublisherDto } from '@apis/company/dtos/create-publisher.dto';
import { UpdatePublisherDto } from '@apis/company/dtos/update-publisher.dto';

// Query DTOs
import { PublisherQueryDto } from '@apis/company/dtos/publisher-search-query.dto';

// Serializer DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';
import { PaginatedCompaniesDataDto } from '@apis/company/serializer-dtos/paginated-companies-data.dto';

// Swagger descriptors
import { createPublisherDescriptor } from '@apis/company/api-descriptors/create-publisher.descriptor';
import { deletePublisherDescriptor } from '@apis/company/api-descriptors/delete-publisher.descriptor';
import { getAllPublishersDescriptor } from '@apis/company/api-descriptors/get-all-publishers.descriptor';
import { getPublishersPaginatedDescriptor } from '@apis/company/api-descriptors/get-publishers-paginated.descriptor';
import { getPublishersDescriptor } from '@apis/company/api-descriptors/get-publishers.descriptor';
import { updatePublisherDescriptor } from '@apis/company/api-descriptors/update-publisher.descriptor';

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiDescriptor(createPublisherDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Post()
  @HttpCode(201)
  async createPublisher(@Body() body: CreatePublisherDto) {
    const result = await this.companyService.createPublisher(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersDescriptor)
  @Serialize(CompanyDto)
  @Get(':id')
  @HttpCode(200)
  async getPublisher(@Param('id', ParseIntPipe) id: number) {
    const result = await this.companyService.getPublisher(id);

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersDescriptor)
  @Serialize(CompanyDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getPublishers(@Param('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    const result = await this.companyService.getPublishers(ids);

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllPublishersDescriptor)
  @Serialize(CompanyDto)
  @Get()
  @HttpCode(200)
  async getAllPublishers() {
    const result = await this.companyService.getAllPublishers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersPaginatedDescriptor)
  @Serialize(PaginatedCompaniesDataDto)
  @Get('paginated')
  @HttpCode(200)
  async getPublishersPaginated(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('orderBy', new UnionTypeValidationPipe(['id', 'name', 'website']))
    orderBy: 'id' | 'name' | 'website',
    @Query('order', new UnionTypeValidationPipe(['ASC', 'DESC'])) order: 'ASC' | 'DESC',
    @Query('searchQuery', new ParseJsonPipe(PublisherQueryDto, { optional: true, validate: true }))
    searchQuery: PublisherQueryDto = {},
  ) {
    const result = await this.companyService.getPublishersPaginated(page, limit, orderBy, order, searchQuery);

    // Send the response
    return result;
  }

  @ApiDescriptor(updatePublisherDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updatePublisher(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePublisherDto) {
    const result = await this.companyService.updatePublisher(id, body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deletePublisherDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deletePublisher(@Param('id', ParseIntPipe) id: number) {
    const result = await this.companyService.deletePublisher(id);

    // Send the response
    return result;
  }
}
