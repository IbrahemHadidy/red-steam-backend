import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiDescriptor } from '@decorators/api-descriptor.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from '@apis/company/company.service';

// Guards
import { JwtAccessAuthGuard } from '@guards/jwt-access-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

// Dtos
import { CreatePublisherDto } from '@apis/company/dtos/create-publisher.dto';
import { UpdatePublisherDto } from '@apis/company/dtos/update-publisher.dto';

// Swagger descriptors
import { createPublisherDescriptor } from '@apis/company/api-descriptors/create-publisher.descriptor';
import { getPublishersDescriptor } from '@apis/company/api-descriptors/get-publishers.descriptor';
import { getAllPublishersDescriptor } from '@apis/company/api-descriptors/get-all-publishers.descriptor';
import { getPublishersPaginatedDescriptor } from '@apis/company/api-descriptors/get-publishers-paginated.descriptor';
import { updatePublisherDescriptor } from '@apis/company/api-descriptors/update-publisher.descriptor';
import { deletePublisherDescriptor } from '@apis/company/api-descriptors/delete-publisher.descriptor';

@Controller('publisher')
@ApiTags('Publisher')
export class PublisherController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(createPublisherDescriptor)
  @Post()
  @HttpCode(201)
  async createPublisher(@Body() body: CreatePublisherDto) {
    const result = await this.companyService.createPublisher(body);

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersDescriptor)
  @Get(':id')
  @HttpCode(200)
  async getPublisher(@Param('id') id: string) {
    const result = await this.companyService.getPublisher(Number(id));

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersDescriptor)
  @Get('bulk/:ids')
  @HttpCode(200)
  async getPublishers(@Param('ids') ids: string) {
    const result = await this.companyService.getPublishers(ids.split(',').map(Number));

    // Send the response
    return result;
  }

  @ApiDescriptor(getAllPublishersDescriptor)
  @Get()
  @HttpCode(200)
  async getAllPublishers() {
    const result = await this.companyService.getAllPublishers();

    // Send the response
    return result;
  }

  @ApiDescriptor(getPublishersPaginatedDescriptor)
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

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(updatePublisherDescriptor)
  @Put(':id')
  @HttpCode(200)
  async updatePublisher(@Param('id') id: string, @Body() body: UpdatePublisherDto) {
    const result = await this.companyService.updatePublisher(Number(id), body);

    // Send the response
    return result;
  }

  @UseGuards(JwtAccessAuthGuard, AdminGuard)
  @ApiDescriptor(deletePublisherDescriptor)
  @Delete(':id')
  @HttpCode(200)
  async deletePublisher(@Param('id') id: string) {
    const result = await this.companyService.deletePublisher(Number(id));

    // Send the response
    return result;
  }
}
