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
import { CreatePublisherDto } from '@apis/company/dtos/create-publisher.dto';
import { UpdatePublisherDto } from '@apis/company/dtos/update-publisher.dto';

// Serializer DTOs
import { CompanyDto } from '@apis/company/serializer-dtos/company.dto';

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
  async getPublisher(@Param('id') id: string) {
    const result = await this.companyService.getPublisher(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersDescriptor)
  @Serialize(CompanyDto)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getPublishers(@Param('ids') ids: string) {
    const result = await this.companyService.getPublishers(ids.split(',').map(Number));

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
  @Serialize(CompanyDto)
  @Get('paginated')
  @HttpCode(200)
  async getPublishersPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('orderBy') orderBy: 'id' | 'name',
    @Query('order') order: 'ASC' | 'DESC',
    @Query('searchQuery') searchQuery?: string,
  ) {
    const result = await this.companyService.getPublishersPaginated(
      Number(page),
      Number(limit),
      orderBy,
      order,
      searchQuery ? JSON.parse(decodeURIComponent(searchQuery)) : {},
    );

    // Send the response
    return result;
  }

  @ApiDescriptor(updatePublisherDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Put(':id')
  @HttpCode(200)
  async updatePublisher(@Param('id') id: string, @Body() body: UpdatePublisherDto) {
    const result = await this.companyService.updatePublisher(Number(id), body);

    // Send the response
    return result;
  }

  @ApiDescriptor(deletePublisherDescriptor)
  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @Delete(':id')
  @HttpCode(200)
  async deletePublisher(@Param('id') id: string) {
    const result = await this.companyService.deletePublisher(Number(id));

    // Send the response
    return result;
  }
}
